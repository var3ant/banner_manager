import React from 'react';
import './App.css';
import {Button, styled, ButtonProps, alpha} from '@mui/material';
import BannerPage from "./Pages/Page/Banner/BannerPage";
import CategoryPage from "./Pages/Page/Category/CategoryPage";
import {ArrowDropDown} from "@mui/icons-material";
import {blue} from "@mui/material/colors";


interface IProps {

}

enum Window {
    Banner,
    Category
}

interface IState {
    window: Window
}

const MenuButton = styled(Button)<ButtonProps>(({theme}) => ({
    border: "none",
    "&:hover": {
        border: "none"
    },
}));

function Arrow(props: { selected: string }) {
    return (
        <ArrowDropDown style={{marginBottom: "2px", color: alpha(blue[700], props.selected === "true" ? 1 : 0)}}/>
    )
}


export default class App extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            window: Window.Banner,
        }
    }

    render() {
        if (this.state.window === Window.Banner) {
            return (
                <div style={{
                    width: "65vw", position: "relative", left: "50%",
                    transform: "translateX(-50%)"
                }}>
                    <div className="top-menu">
                        <MenuButton variant="outlined" onClick={() => {
                            this.setState({window: Window.Banner})
                        }}>
                            <Arrow selected="true"/>
                            Banners
                        </MenuButton>
                        <MenuButton variant="outlined" onClick={() => {
                            this.setState({window: Window.Category})
                        }}>
                            <Arrow selected="false"/>
                            <div style={{
                                color: "black"
                            }}>Categories
                            </div>
                        </MenuButton>
                    </div>
                    <BannerPage/>
                </div>
            );
        } else {
            return (
                <div style={{
                    width: "65vw", position: "relative", left: "50%",
                    transform: "translateX(-50%)"
                }}>
                        <div className="top-menu">
                            <MenuButton variant="outlined" onClick={() => {
                                this.setState({window: Window.Banner})
                            }}>
                                <Arrow selected="false"/>
                                <div style={{
                                    color: "black"
                                }}>Banners
                                </div>
                            </MenuButton>
                            <MenuButton variant="outlined" onClick={() => {
                                this.setState({window: Window.Category})
                            }}>
                                <Arrow selected="true"/>
                                Categories
                            </MenuButton>
                        </div>
                        <CategoryPage/>
                </div>
            );
        }
    }
}