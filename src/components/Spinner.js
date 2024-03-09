import React, { PureComponent } from 'react';

export class spinner extends PureComponent {
    render() {
        return (
            <div className="text-center">
                <div className="spinner-grow" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }
}

export default spinner;