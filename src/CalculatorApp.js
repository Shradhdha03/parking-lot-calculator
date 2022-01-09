import React from "react";
import Calculator from "./Calculator";
import moment from "moment";
class CalculatorApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            start_time: '',
            end_time: '',
            fees: 0,
            number_plate: '',
            name_on_card: '',
            card_cvv: '',
            card_expiry_date: '',
            card_number: '',
            error_message: '',
            success_message: '',
            email: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value, fees: 0, error_message: '', success_message: '' });
        this.setState({ [event.target.name]: event.target.value }, function () {
            if (['start_time', 'end_time'].includes(event.target.name) && this.state.start_time && this.state.end_time) {
                const calculator = new Calculator();
                const fees = calculator.calculate_fees(this.state.start_time, this.state.end_time);
                this.setState({ fees: fees });

            }
        });



    }

    handleSubmit(event) {
        const calculator = new Calculator();
        const fees = calculator.calculate_fees(this.state.start_time, this.state.end_time);
        let error_message = '';
        let success_message = '';

        if (!moment(this.state.end_time).isAfter(moment(this.state.start_time))) {
            error_message += 'Please select valid start and end dates.\n';
        }
        if (!(this.state.number_plate.length >= 1 && this.state.number_plate.length <= 10)) {
            error_message += 'Please enter valid Number Plate.\n';
        }
        if (!(this.state.email.length >= 5 && this.state.email.length <= 50)) {
            error_message += 'Please enter valid email.\n';
        }
        if (!(this.state.name_on_card.length >= 2 && this.state.name_on_card.length <= 50)) {
            error_message += 'Please enter valid Full Name on the card.\n';
        }

        if (!(this.state.card_number.length === 16)) {
            error_message += 'Please enter valid Card.\n';
        }
        if (!(this.state.card_expiry_date.length === 4)) {
            error_message += 'Please enter valid Expiry Date.\n';
        }

        if (!(this.state.card_cvv.length === 3)) {
            error_message += 'Please enter valid CVV number.\n';
        }
        if (!error_message) {
            if ((this.state.card_cvv == '123' && this.state.card_expiry_date == '1122' && this.state.card_number == '4444888844448888')) {
                success_message += 'Transaction Approved. You will receive a receipt by email. \n';
            } else {
                error_message = 'Transaction Failed. Please try again.'
            }
        }
        //show error
        //show sucess
        this.setState({ fees: fees, error_message: error_message, success_message: success_message });
        event.preventDefault();
    }

    render() {
        return (
            <>

                <div className="container">
                    <main>
                        <div className="py-5 text-center">
                            <img className="d-block mx-auto mb-4" src="https://media.istockphoto.com/vectors/lester-b-pearson-airport-toronto-stamp-vector-id1278682364?s=612x612" alt="" width="100" />
                            <h2 className="text-primary">Airport Parking Lot Calculator</h2>
                            <p className="lead">Toronto Pearson International Airport</p>
                        </div>

                        <div className="row g-5">
                            <div className="col-md-5 col-lg-4 order-md-last">
                                <h4 className="d-flex justify-content-between align-items-center mb-3">
                                    <span className="text-primary">Your total</span>

                                </h4>
                                <ul className="list-group mb-3">
                                    <li className="list-group-item d-flex justify-content-between lh-sm">
                                        <div>
                                            <h6 className="my-0">Start Time</h6>

                                        </div>
                                        <span className="text-muted displayed_start_time" id='displayed_start_time'>{this.state.start_time}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between lh-sm">
                                        <div>
                                            <h6 className="my-0">End Time</h6>

                                        </div>
                                        <span className="text-muted displayed_end_time" id='displayed_end_time'>{this.state.end_time}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between lh-sm">
                                        <div>
                                            <h6 className="my-0">Parking Cost</h6>

                                        </div>
                                        <span className="text-muted parking_cost" id='parking_cost'>C${this.state.fees}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between lh-sm">
                                        <div>
                                            <h6 className="my-0">Tax (10% HST)</h6>

                                        </div>
                                        <span className="text-muted tax_rate" id='tax_rate'>C${(this.state.fees * 0.10).toFixed(2)}</span>
                                    </li>

                                    <li className="list-group-item d-flex justify-content-between">
                                        <span>Total (CAD)</span>
                                        <strong className="total_amount" id="total_amount">C${(this.state.fees * 1.10).toFixed(2)}</strong>
                                    </li>
                                </ul>


                            </div>
                            {this.state.success_message ? <div className="col-md-7 col-lg-8 text-start">
                                <p className="success_message alert-success" id="success_message"> {this.state.success_message}</p>
                                </div> : <div className="col-md-7 col-lg-8 text-start">
                                <h4 className="mb-3 text-primary">Parking Details</h4>
                                <form className="needs-validation" onSubmit={this.handleSubmit}>
                                    <div className="row g-3 " >
                                        <div className="col-sm-6">
                                            <label htmlFor="start_time" className="form-label">Start Time</label>
                                            <input type="datetime-local" name="start_time" value={this.state.start_time} onChange={this.handleChange} className="form-control" id="start_time" required />
                                        </div>

                                        <div className="col-sm-6">
                                            <label htmlFor="end_time" className="form-label">Last name</label>
                                            <input type="datetime-local" name="end_time" value={this.state.end_time} onChange={this.handleChange} className="form-control" id="end_time" required min={this.state.start_time} />

                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="number_plate" className="form-label">Number Plate</label>
                                            <div className="input-group has-validation">

                                                <input type="text" name="number_plate" className="form-control" id="number_plate" placeholder="Number Plate" required onChange={this.handleChange} value={this.state.number_plate} />

                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="email" className="form-label">Email Address</label>
                                            <div className="input-group has-validation">

                                                <input type="email" name="email" className="form-control" id="email" placeholder="Email" required onChange={this.handleChange} value={this.state.email} />

                                            </div>
                                        </div>

                                    </div>


                                    <br />

                                    <h4 className="mb-3 text-primary">Payment</h4>
                                    <div className="row gy-3">
                                        <div className="col-md-6">
                                            <label htmlFor="name_on_card" className="form-label">Name on card</label>
                                            <input type="text" className="form-control" name="name_on_card" id="name_on_card" placeholder="John Smith" required onChange={this.handleChange} value={this.state.name_on_card} />


                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="card_number" className="form-label">Credit card number</label>
                                            <input type="number" className="form-control" name="card_number" id="card_number" placeholder="1111222233334444" required onChange={this.handleChange} value={this.state.card_number} />

                                        </div>

                                        <div className="col-md-3">
                                            <label htmlFor="card_expiry_date" className="form-label">Expiration</label>
                                            <input type="number" className="form-control" name="card_expiry_date" id="card_expiry_date" placeholder="MMYY" required onChange={this.handleChange} value={this.state.card_expiry_date} />

                                        </div>

                                        <div className="col-md-3">
                                            <label htmlFor="card_cvv" className="form-label">CVV</label>
                                            <input type="number" className="form-control" id="card_cvv" name="card_cvv" placeholder="123" required onChange={this.handleChange} value={this.state.card_cvv} />

                                        </div>
                                    </div>

                                    <br />

                                    <button id="submit_payment" className=" btn btn-primary btn submit_payment" type="submit">Submit Payment</button>
                                </form>

                               < br/>
                                <p className="error_message alert-danger" id="error_message"> {this.state.error_message}</p>

                            </div>}
                            
                            
                               
                        </div>
                    </main>
                </div>
            </>
        );
    }
}
export default CalculatorApp;