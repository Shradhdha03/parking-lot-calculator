const moment = require('moment');

const FREE_MINUTES = 30;
const REDUCED_PRICE_MINUTES = 60;
const FEES_FIRST_THIRTY_MINUTES = 0.0;
const FEES_FIRST_HOUR = 5.0;
const FEES_OTHER_HOURS = 7.5;
const FEES_MAX_PER_DAY = 35;
const FEES_MAX_PER_WEEK = FEES_MAX_PER_DAY * 6;
const MINUTES_IN_HOUR = 60;
const MINUTES_IN_DAY = 24 * MINUTES_IN_HOUR;
const MINUTES_IN_WEEK = MINUTES_IN_DAY * 7;


const Calculator= function(){

    this.calculate_date_differnece = function(start, end) {
        start = moment(start)
        end = moment(end);

        const minutes = Math.abs(end.diff(start, 'minutes'));

        return {
            days: parseInt(minutes / MINUTES_IN_DAY),
            hours: parseInt((minutes % MINUTES_IN_DAY) / MINUTES_IN_HOUR),
            minutes: (minutes % MINUTES_IN_DAY) % MINUTES_IN_HOUR,
        }

    }
    this.calculate_fees = function(start, end) {
        const differnce = this.calculate_date_differnece(start, end);
        console.log(differnce);
        return this.calculate(differnce.minutes, differnce.hours, differnce.days);
    }

    this.calculate = function(minutes, hours, days) {
        let total_minutes = minutes + MINUTES_IN_HOUR * hours + MINUTES_IN_DAY * days;
        const calculation_for_last_not_full_week = this.calculate_per_week_fee(total_minutes % MINUTES_IN_WEEK);
        const total_of_full_weeks = parseInt(total_minutes / MINUTES_IN_WEEK) * FEES_MAX_PER_WEEK;

        return calculation_for_last_not_full_week + total_of_full_weeks;
    }

    this.calculate_per_week_fee = function(total_minutes) {
        const calculation_for_last_not_full_day = this.calculate_per_day_fee(total_minutes % MINUTES_IN_DAY);
        const total_of_full_days = parseInt(total_minutes / MINUTES_IN_DAY) * FEES_MAX_PER_DAY;

        return Math.min(calculation_for_last_not_full_day + total_of_full_days, FEES_MAX_PER_WEEK);


    }
    this.calculate_per_day_fee = function(total_minutes) {
        let fees = FEES_FIRST_THIRTY_MINUTES;

        // First free minutes
        if (total_minutes <= FREE_MINUTES) {
            return fees;
        }
        // First hour after 30 minutes
        fees += FEES_FIRST_HOUR;

        total_minutes -= (FREE_MINUTES + REDUCED_PRICE_MINUTES);

        fees += Math.ceil(total_minutes / MINUTES_IN_HOUR) * FEES_OTHER_HOURS;
        fees = (fees > FEES_MAX_PER_DAY) ? FEES_MAX_PER_DAY : fees;


        return fees;
    }
}
module.exports= Calculator;