import React from "react";
import ErrorContainer from "../../Elements/ErrorContainer";
import CategoryService from "../../../Network/CategoryService";
import CategoryPanel from "./Panel/CategoryPanel";
import LeftList, {LeftListUpdater} from "../../Elements/LeftMenu/LeftList";
import SearchField from "../../Elements/LeftMenu/SearchField";
import {Button} from "@mui/material";


interface CategoryPageState {
    id: number | null;
}

export default class CategoryPage extends React.Component<any, CategoryPageState> implements LeftListUpdater {
    public panel: CategoryPanel | null = null;
    public leftList: LeftList | null = null;
    public errorContainer: ErrorContainer | null = null;

    constructor(props: any) {
        super(props);
        this.state = {
            id: null
        }
    }

    render() {
        return (
            <div className='workspace'>
                <div className="left-menu">
                    <h2 style={{marginBottom: "15px", textAlign: "center"}}>
                        Categories:
                    </h2>
                    <SearchField searchEvent={(field: string) => this.search(field)}/>
                    <LeftList updater={this} updateFunc={(list: LeftList) => {
                        this.updateList(list)
                    }} onClick={(id: number) => {
                        this.openCategory(id)
                        this.leftList?.setId(id);
                    }}/>
                    <div className="button-container-vertical">
                        <div style={{
                            width: "100%",
                            paddingLeft: "1px",
                            paddingRight: "1px",
                        }}>
                            <Button fullWidth variant="contained" color="primary" onClick={() => {
                                this.createNewCategory()
                                this.leftList?.setId(null);
                            }}>Create new
                                Category</Button>
                        </div>
                    </div>
                </div>
                <div className="right-menu">
                    <CategoryPanel categoryId={this.state ? this.state.id : null} parent={this}/>
                </div>
            </div>
        );
    }

    openCategory(id: number) {
        this.panel?.setId(id);
        this.setState({id: id})
    }

    createNewCategory() {
        this.panel?.setId(null);
        this.setState({id: null});
    }

    setPanel(param: CategoryPanel) {
        this.panel = param;
    }

    setLeftList(param: LeftList) {
        this.leftList = param;
    }

    onDelete(id: number) {
        CategoryService.delete(id).then(() => {
            this.leftList?.update()
            this.panel?.setId(null);
        }).catch((error) => {
            this.setErrors(error.response.data);
        })
    }

    setErrorContainer(param: ErrorContainer) {
        this.errorContainer = param;
    }

    setErrors(data: string[]) {
        this.errorContainer?.setErrors(data);
    }

    private search(searchField: string) {
        let callback = (response: { data: any; }) => {
            this.leftList?.setState({elements: response.data});
        }
        if (searchField === "") {
            CategoryService.getPreviews().then(callback)
        } else {
            CategoryService.searchPreviews(searchField).then(callback);
        }
    }

    private updateList(list: LeftList) {
        CategoryService.getPreviews().then((response) => {
            list.setState({elements: response.data})
        })
    }
}
