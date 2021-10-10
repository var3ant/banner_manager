import React from 'react';
import {Box, Button, ButtonProps, styled, TextField} from "@mui/material";
import BannerService from "../../../../Network/BannerService";
import {AddBannerDto} from '../../../../Network/Dto/Banner/AddBannerDto';
import {UpdateBannerDto} from '../../../../Network/Dto/Banner/UpdateBannerDto';
import CategoriesService from "../../../../Network/CategoryService";
import BannerPage from "../BannerPage";
import {BannerEntity} from "../../../../Network/Dto/Banner/BannerEntity";
import {Theme} from "@mui/material/styles";
import {SxProps} from "@mui/system";
import ErrorContainer from "../../../Elements/ErrorContainer";
import DropList from "../../../Elements/DropList";
import {blueGrey} from "@mui/material/colors";


const BlackButton = styled(Button)<ButtonProps>(({theme}) => ({
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: blueGrey[900],
    '&:hover': {
        backgroundColor: blueGrey[900],
    },
}));


interface IProps {
    bannerId: number | null,
    parent: BannerPage
}

interface BannerPanelState {
    bannerName: string;
    category: string;
    price: string;
    text: string;
    items: { id: number | undefined, name: string }[];
    bannerId: number | null;
}

let boxSx: SxProps<Theme> = {
    width: 1000,
    minWidth: '50%',
    maxWidth: '50%',
}

export default class BannerPanel extends React.Component<IProps, BannerPanelState> {

    constructor(props: Readonly<IProps> | IProps) {
        super(props);
        this.props.parent.setPanel(this);
        this.state = {
            bannerName: "",
            category: "",
            price: "",
            text: "",
            items: [{id: undefined, name: "Loading..."}],
            bannerId: props.bannerId
        };
    }

    private copyState(): BannerPanelState {
        return {
            bannerName: this.state.bannerName,
            category: this.state.category,
            price: this.state.price,
            text: this.state.text,
            items: this.state.items,
            bannerId: this.state.bannerId
        };
    }

    private setBannerName(name: string) {
        let s: BannerPanelState = this.copyState()
        s.bannerName = name;
        this.props.parent.setErrors(new Array<string>(0));
        this.setState(s);
    }

    private setItems(items: { id: number | undefined, name: string }[]) {
        let s: BannerPanelState = this.copyState()
        s.items = items;
        this.props.parent.setErrors(new Array<string>(0));
        this.setState(s);
    }

    private setCategory(category: string) {
        let s: BannerPanelState = this.copyState()
        s.category = category;
        this.props.parent.setErrors(new Array<string>(0));
        this.setState(s);
    }

    private setPrice(price: string) {
        let s: BannerPanelState = this.copyState()
        s.price = price;
        this.props.parent.setErrors(new Array<string>(0));
        this.setState(s);
    }

    private setText(text: string) {
        let s: BannerPanelState = this.copyState()
        s.text = text;
        this.props.parent.setErrors(new Array<string>(0));
        this.setState(s);
    }

    /* //All methods above could be replaced with this method. But this code will break Typing.
    setInputValue(field: string, value: string) {
        let s: BannerPanelState = copyState()
        // @ts-ignore
        s[field] = value;
        this.setState(s);
        this.props.parent.setErrors(new Array<string>(0));
    }
     */

    componentDidMount() {
        CategoriesService.getPreviews().then((response) => {
            this.setItems(response.data);
        })
    }

    setId(id: number | null) {
        let s: BannerPanelState = this.copyState()
        s.bannerId = id;
        this.props.parent.setErrors(new Array<string>(0));
        this.setState(s);
        if (id === null) {
            this.clear();
        } else {
            BannerService.get(id).then((response) => {
                let entity: BannerEntity = response.data;
                this.setState({
                    bannerName: entity.name,
                    category: String(entity.categoryId),
                    price: String(entity.price),
                    text: entity.text,
                    items: this.state.items,
                    bannerId: entity.id
                })
            })
        }
    }

    clear() {
        this.setState({
            bannerName: "",
            category: "",
            price: "",
            text: "",
            items: this.state.items,
            bannerId: null
        })
    }

    generateLabel(): string {
        if (this.state.bannerId === null || this.state.bannerName === "") {
            return "Create new banner"
        }
        return this.state.bannerName + "   ID: " + this.state.bannerId;
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
                                       value={this.state.bannerName}
                                       onChange={e => this.setBannerName(e.target.value)}
                            />
                        </Box>
                    </div>
                    <div className="row">
                        <label htmlFor="Price"><b>Price</b></label>
                        <Box sx={boxSx}>
                            <TextField size="small" style={{marginBottom: "15px"}} fullWidth={true}
                                       value={this.state.price ? this.state.price : ''}
                                       onChange={e => this.setPrice(e.target.value)}
                            />
                        </Box>
                    </div>
                    <div className="row">
                        <label htmlFor="Category"><b>Category</b></label>
                        <Box sx={boxSx}>
                            <DropList items={this.state.items} value={this.state.category}
                                      onChange={e => this.setCategory(e.target.value)}
                            />
                        </Box>
                    </div>
                    <div className="row">
                        <label htmlFor="Text"><b>Text</b></label>
                        <Box sx={boxSx}>
                            <TextField rows={10}
                                       fullWidth={true}
                                       style={{marginBottom: "15px"}}
                                       id="outlined-multiline-flexible"
                                       label=""
                                       multiline
                                       value={this.state.text}
                                       onChange={e => this.setText(e.target.value)}
                            />
                        </Box>
                    </div>
                </div>
                <div className="button-container-vertical">
                    <ErrorContainer updater={this.props.parent}/>
                </div>
                <div className="button-container-vertical">
                    <div className="button-container-horizontal">
                        <div className="left-button">
                            <BlackButton variant="contained" color="primary"
                                         onClick={() => this.addBanner()}>Save</BlackButton>
                        </div>
                        <div className="right-button">
                            <Button variant="contained" color="error" disabled={this.state.bannerId === null}
                                    onClick={() => {
                                        if (this.state.bannerId !== null) {
                                            this.props.parent.onDelete(this.state.bannerId)
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
        let definitelyString = String(str);
        return definitelyString === undefined || definitelyString.replace(/\s/g, "") === "";
    }

    validate(): string[] {
        let errors: string[] = [];
        if (this.isBlank(this.state.bannerName)) {
            errors.push("Name is blank");
        }
        if (this.isBlank(this.state.text)) {
            errors.push("Text is blank");
        }
        if (this.isBlank(this.state.price)) {
            errors.push("Price is blank");
        } else if (isNaN(Number(this.state.price))) {
            errors.push("Price not a number");
        } else {
            let priceNum: number = parseFloat(this.state.price);
            if(Math.round(priceNum * 100) / 100 === 0) {
                errors.push("Price is too small");
            } else if (priceNum <= 0) {
                errors.push("Price less or equal to zero");
            }
        }
        if (this.isBlank(this.state.category)) {
            errors.push("Category is blank");
        }
        return errors;
    }

    addBanner() {
        console.log(this.state.bannerName + " " + this.state.price + " " + this.state.category + " " + this.state.text)
        let errors = this.validate();
        if (errors.length === 0) {
            let priceFixed: number = Math.round(parseFloat(this.state.price) * 100) / 100;
            if (this.state.bannerId === null) {
                BannerService.add(new AddBannerDto(this.state.bannerName, priceFixed, parseInt(this.state.category), this.state.text))
                    .then((response) => {
                        this.props.parent.leftList?.update()
                        this.setId(response.data)
                    })
                    .catch((error) => {
                        this.props.parent.setErrors(error.response.data);
                    })
            } else {
                BannerService.update(new UpdateBannerDto(this.state.bannerId, this.state.bannerName, priceFixed, parseInt(this.state.category), this.state.text))
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