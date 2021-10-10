import React from 'react';
import {Box, Button, ButtonProps, styled, TextField} from "@mui/material";
import CategoryPage from "../CategoryPage";
import ErrorContainer from "../../../Elements/ErrorContainer";
import {Theme} from "@mui/material/styles";
import {SxProps} from "@mui/system";
import CategoryService from '../../../../Network/CategoryService';
import {CategoryEntity} from "../../../../Network/Dto/Category/CategoryEntity";
import {AddCategoryDto} from "../../../../Network/Dto/Category/AddCategoryDto";
import {UpdateCategoryDto} from "../../../../Network/Dto/Category/UpdateCategoryDto";
import {blueGrey} from "@mui/material/colors";

const BlackButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: blueGrey[900],
    '&:hover': {
        backgroundColor: blueGrey[900],
    },
}));

interface IProps {
    categoryId: number | null,
    parent: CategoryPage
}

interface CategoryPanelState {
    categoryName: string;
    reqName: string;
    categoryId: number | null;
}

let boxSx: SxProps<Theme> = {
    width: 1000,
    minWidth: '50%',
    maxWidth: '50%',
}

export default class CategoryPanel extends React.Component<IProps, CategoryPanelState> {

    constructor(props: Readonly<IProps> | IProps) {
        super(props);
        this.props.parent.setPanel(this);
        this.state = {
            categoryName: "",
            reqName: "",
            categoryId: props.categoryId
        };
    }


    private copyState(): CategoryPanelState {
        return {
            categoryName: this.state.categoryName,
            reqName: this.state.reqName,
            categoryId: this.state.categoryId
        };
    }

    private setReqName(reqName: string) {
        let s: CategoryPanelState = this.copyState()
        s.reqName = reqName;
        this.props.parent.setErrors(new Array<string>(0));
        this.setState(s);
    }

    private setCategoryName(categoryName: string) {
        let s: CategoryPanelState = this.copyState()
        s.categoryName = categoryName;
        this.props.parent.setErrors(new Array<string>(0));
        this.setState(s);
    }

    /* //All methods above could be replaced with this method. But this code will break Typing.
    setInputValue(field: string, value: any) {
        let s: CategoryPanelState = {
            categoryName: this.state.categoryName,
            reqName: this.state.reqName,
            categoryId: this.state.categoryId
        }
        // @ts-ignore
        s[field] = value;
        this.setState(s);
        this.props.parent.setErrors(new Array<string>(0));
    }
     */


    setId(id: number | null) {
        let s: CategoryPanelState = this.copyState()
        s.categoryId = id;
        this.props.parent.setErrors(new Array<string>(0));
        this.setState(s);
        if (id === null) {
            this.clear();
        } else {
            CategoryService.get(id).then((response) => {
                let entity: CategoryEntity = response.data;
                this.setState({
                    categoryName: entity.name,
                    reqName: entity.reqName,
                    categoryId: entity.id
                })
            })
        }
    }

    clear() {
        this.setState({
            categoryName: "",
            reqName: "",
            categoryId: null
        })
    }

    generateLabel(): string {
        if (this.state.categoryId === null || this.state.categoryName === "") {
            return "Create new category"
        }
        return this.state.categoryName + "   ID: " + this.state.categoryId;
    }

    render() {
        let label: string = this.generateLabel();
        return (
            <div style={{margin: "5px"}}>
                <div>
                    <h2 style={{marginBottom: "30px"}}>
                        {label}
                    </h2>
                    <div className="row">
                        <label htmlFor="Name"><b>Name</b></label>
                        <Box sx={boxSx}>
                            <TextField size="small" style={{marginBottom: "15px"}} fullWidth={true}
                                       value={this.state.categoryName}
                                       onChange={e => this.setCategoryName(e.target.value)}
                            />
                        </Box>
                    </div>
                    <div className="row">
                        <label htmlFor="Request ID"><b>Request ID</b></label>
                        <Box sx={boxSx}>
                            <TextField size="small" style={{marginBottom: "15px"}} fullWidth={true}
                                       value={this.state.reqName}
                                       onChange={e => this.setReqName(e.target.value)}
                            />
                        </Box>
                    </div>
                    <div className="button-container-vertical">
                        <ErrorContainer updater={this.props.parent}/>
                    </div>
                </div>
                <div className="button-container-vertical">
                    <div className="button-container-horizontal">
                        <div className="left-button">
                            <BlackButton variant="contained" color="primary" onClick={() => this.addCategory()}>Save</BlackButton>
                        </div>
                        <div className="right-button">
                            <Button variant="contained" color="error" disabled={this.state.categoryId === null}
                                    onClick={() => {
                                        if (this.state.categoryId !== null) {
                                            this.props.parent.onDelete(this.state.categoryId)
                                        }
                                    }}
                            >Delete</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    isBlank(str: string) {
        return str === undefined || str.replace(/\s/g, "") === "";
    }

    validate(): string[] {
        let errors: string[] = [];
        if (this.isBlank(this.state.categoryName)) {
            errors.push("Name is blank");
        }
        if (this.isBlank(this.state.reqName)) {
            errors.push("Request ID is blank");
        }
        return errors;
    }

    addCategory() {
        console.log(this.state.categoryName + " " + this.state.reqName + " " + this.state.categoryId)
        let errors = this.validate();
        if (errors.length === 0) {
            if (this.state.categoryId === null) {
                CategoryService.add(new AddCategoryDto(this.state.categoryName, this.state.reqName))
                    .then((response) => {
                        this.props.parent.leftList?.update()
                        this.setId(response.data)
                    })
                    .catch((error) => {
                        this.props.parent.setErrors(error.response.data);
                    })
            } else {
                CategoryService.update(new UpdateCategoryDto(this.state.categoryId, this.state.categoryName, this.state.reqName))
                    .then(() => {
                        this.props.parent.leftList?.update()
                    })
                    .catch((error) => {
                        this.props.parent.setErrors(error.response.data);
                    })
            }
        } else {
            this.props.parent.setErrors(errors);
        }
    }
}
