import React from "react";


export interface ErrorsUpdater {
    setErrorContainer(container: ErrorContainer): void
}

interface IState {
    errors: string[]
}

interface IProps {
    updater: ErrorsUpdater
}

export default class ErrorContainer extends React.Component<IProps, IState> {

    setErrors(errors: string[]) {
        this.setState({
            errors: errors
        })
    }

    constructor(props: IProps) {
        super(props);
        this.state = {
            errors: new Array<string>(0)
        }
        props.updater.setErrorContainer(this);
    }

    render() {
        if (this.state.errors.length === 0) {
            return null;
        } else {
            return (
                <div className="error-container">
                    {this.state.errors.map((item) => {
                        return <li>{item}</li>
                    })}
                </div>
            );
        }
    }
}