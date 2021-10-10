import * as React from 'react';
import ListItemButton from "@mui/material/ListItemButton/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {List} from '@mui/material';

export interface LeftListUpdater {
    setLeftList(list: LeftList): void;
}

type LeftListState = {
    elements: BannerPreview[];
    id: number | null;
}

interface LeftListProp {
    onClick: (id: number) => void;
    updater: LeftListUpdater;
    updateFunc: (list: LeftList) => void;
}

interface BannerPreview {
    name: string;
    id: number;
}

export default class LeftList extends React.Component<LeftListProp, LeftListState> {
    constructor(props: LeftListProp) {
        super(props);
        props.updater.setLeftList(this);
        this.state = {
            elements: new Array(0),
            id: null
        }
    }

    setId(id: number | null) {
        this.setState({
            elements: this.state.elements,
            id: id,
            }
        )
    }

    componentDidMount() {
        this.props.updateFunc(this);
    }

    render() {
        return (
            <List
                sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    '& ul': {padding: 0},
                }}
                subheader={<li/>}
            >
                {this.state.elements.map(item =>
                    (
                        <li key={item.id}>
                            <ul>
                                <ListItemButton selected={item.id === this.state.id} onClick={() => {
                                    this.props.onClick(item.id)
                                }}>
                                    <ListItemText primary={item.name}/>
                                </ListItemButton>
                            </ul>
                        </li>
                    )
                )}
            </List>
        );
    }

    update() {
        this.props.updateFunc(this);
    }
}
