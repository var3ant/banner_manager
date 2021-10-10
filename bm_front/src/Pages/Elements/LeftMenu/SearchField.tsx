import * as React from 'react';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import {TextField} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';

interface IState {
    searchField: string;
}

interface IProps {
    searchEvent: (field: string) => (void);
}

export default class SearchField extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            searchField: ''
        }
    }

    render() {
        return (
            <Paper
                sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: "auto"}}
            >
                <TextField size="small" style={{marginBottom: "5px"}} fullWidth={true}
                    placeholder={"Enter banner name..."}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton type="submit" sx={{p: '0px'}} aria-label="search" onClick={() => {
                                    this.props.searchEvent(this.state.searchField);
                                }}>
                                    <SearchIcon style={{marginLeft:"-10px", marginRight:"-6px"}}/>
                                </IconButton>
                            </InputAdornment>
                        ),
                        //disableUnderline: true,
                    }}
                    //variant="standard"
                    value={this.state.searchField ? this.state.searchField : ''}
                    onChange={e => this.setState({searchField: e.target.value})}
                    onKeyDown={e => {
                        if (e.key === "Enter") {
                            this.props.searchEvent(this.state.searchField);
                        }
                    }}
                />
            </Paper>
        );
    }
}
