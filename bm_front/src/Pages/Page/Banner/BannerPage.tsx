import SearchField from "../../Elements/LeftMenu/SearchField";
import LeftList from "../../Elements/LeftMenu/LeftList";
import BannerPanel from "./Panel/BannerPanel";
import React from "react";
import BannerService from "../../../Network/BannerService";
import ErrorContainer from "../../Elements/ErrorContainer";
import {Button} from "@mui/material";

interface BanerPageState {
    id: number | null;
}


export default class BannerPage extends React.Component<any, BanerPageState> {
    public panel: BannerPanel | null = null;
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
                        Banners:
                    </h2>
                    <SearchField searchEvent={(field: string) => this.search(field)}/>
                    <LeftList updater={this} updateFunc={(list: LeftList) => {
                        this.updateList(list)
                    }} onClick={id => {
                        this.openBanner(id)
                        this.leftList?.setId(id);
                    }}/>
                    <div className="button-container-vertical">
                        <div style={{
                            width: "100%",
                            paddingLeft: "1px",
                            paddingRight: "1px",
                        }}>
                            <Button fullWidth variant="contained" color="primary" onClick={() => {
                                this.createNewBanner()
                                this.leftList?.setId(null);
                            }}>Create new
                                Banner</Button>
                        </div>
                    </div>
                </div>
                <div className="right-menu">
                    <BannerPanel bannerId={this.state ? this.state.id : null} parent={this}/>
                </div>
            </div>
        )
            ;
    }

    openBanner(id: number) {
        this.panel?.setId(id);
        this.setState({id: id})
    }

    createNewBanner() {
        this.panel?.setId(null);
        this.setState({id: null});
    }

    setPanel(param: BannerPanel) {
        this.panel = param;
    }

    setLeftList(param: LeftList) {
        this.leftList = param;
    }

    onDelete(id: number) {
        BannerService.delete(id).then(() => {
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
            BannerService.getPreviews().then(callback)
        } else {
            BannerService.searchPreviews(searchField).then(callback);
        }
    }

    private updateList(list: LeftList) {
        BannerService.getPreviews().then((response) => {
            list.setState({elements: response.data})
        })
    }
}
