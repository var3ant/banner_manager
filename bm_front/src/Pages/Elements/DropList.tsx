import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {EventHandler} from "react";

interface IProps {
    onChange: EventHandler<any>,
    value: string
    items: { id: number | undefined, name: string }[]
}


export default class DropList extends React.Component<IProps, any> {
    render() {
        return (
            <FormControl sx={{minWidth: 210}} size="small" fullWidth={true} style={{marginBottom: "15px"}}>
                <Select
                    value={this.props.value}
                    onChange={this.props.onChange}
                >
                    {this.props.items.map(pair =>
                        (
                            <MenuItem key={pair.id === undefined ? NaN : pair.id} value={pair.id}>{pair.name}</MenuItem>
                        )
                    )}
                </Select></FormControl>
        );
    }

}
