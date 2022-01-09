// min //hours //days // fee
// 30 0 0  0--
// 31 0 0  0--
// 30 1 0 5 --
// 31 1 0 12.50 --
// 30 2 0 12.50 --
// 31 2 0 20.00 --
// 30 5 0 35 --
// 30 6 0 35 --
// 0 0 1 35 --
// 30 0 1  35 --
// 0 0 6 210 --
// 0 0 7 210 --
// 30 0 7 210 --
// 0 0 8 245 ---
const Calculator = require('./Calculator');

test('first 30 minutes should be free', () => {

    let calculator = new Calculator();
    const fees = calculator.calculate(30, 0, 0);
    expect(fees).toBe(0);
});

test('fees for 31 minutes should be $5.00', () => {

    let calculator = new Calculator();
    const fees = calculator.calculate(31, 0, 0);
    expect(fees).toBe(5.00);
});

test('fees for the next 1 hour should be $5.00', () => {

    let calculator = new Calculator();
    const fees = calculator.calculate(30, 1, 0);
    expect(fees).toBe(5.00);
});

test('fees for 1 hour and 31 minutes should be $12.50', () => {

    let calculator = new Calculator();
    const fees = calculator.calculate(31, 1, 0);
    expect(fees).toBe(12.50);
});

test('fees for 2 hour and 30 minutes should be $12.50', () => {

    let calculator = new Calculator();
    const fees = calculator.calculate(30, 2, 0);
    expect(fees).toBe(12.50);
});

test('fees for 2 hour and 31 minutes should be $20.00', () => {

    let calculator = new Calculator();
    const fees = calculator.calculate(31, 2, 0);
    expect(fees).toBe(20.0);
});

test('fees for 5 hour and 30 minutes should be $35.00', () => {

    let calculator = new Calculator();
    const fees = calculator.calculate(30, 5, 0);
    expect(fees).toBe(35.0);
});


test('fees for 5 hour and 31 minutes should be $35.00', () => {

    let calculator = new Calculator();
    const fees = calculator.calculate(31, 5, 0);
    expect(fees).toBe(35.0);
});

test('fees for 1 day 30 minutes should be $35.00', () => {

    let calculator = new Calculator();
    const fees = calculator.calculate(30, 0, 1);
    expect(fees).toBe(35.0);
});


test('fees for 1 day 31 minutes should be $40.00', () => {

    let calculator = new Calculator();
    const fees = calculator.calculate(31, 0, 1);
    expect(fees).toBe(40.0);
});



test('fees for 1 day 5 hours and 31 minutes should be $70.00', () => {

    let calculator = new Calculator();
    const fees = calculator.calculate(31, 5, 1);
    expect(fees).toBe(70.0);
});

test('fees for 6 day should be $210.00', () => {

    let calculator = new Calculator();
    const fees = calculator.calculate(0, 0, 6);
    expect(fees).toBe(210.0);
});

test('fees for 7 day should be $210.00', () => {

    let calculator = new Calculator();
    const fees = calculator.calculate(0, 0, 7);
    expect(fees).toBe(210.0);
});

test('fees for 7 day and 30 minutes should be $210.00', () => {

    let calculator = new Calculator();
    const fees = calculator.calculate(30, 0, 7);
    expect(fees).toBe(210.0);
});

test('fees for 7 day and 31 minutes should be $215.00', () => {

    let calculator = new Calculator();
    const fees = calculator.calculate(31, 0, 7);
    expect(fees).toBe(215.0);
});

test('fees for 8 day should be $245.00', () => {

    let calculator = new Calculator();
    const fees = calculator.calculate(0, 0, 8);
    expect(fees).toBe(245.0);
});

test('differnce betwwn two dates for 2022-01-01 00:00:00 and 2022-01-01 00:41:00', () => {

    let calculator = new Calculator();
    const differnce = calculator.calculate_date_differnece('2022-01-01 00:00:00', '2022-01-01 00:41:00');

    expect(differnce).toEqual({ days: 0, hours: 0, minutes: 41 });
});

test('differnce betwwn two dates for 2022-01-14 00:00:00 and 2022-01-22 00:41:00', () => {

    let calculator = new Calculator();
    const differnce = calculator.calculate_date_differnece('2022-01-14 00:00:00', '2022-01-22 00:41:00');

    expect(differnce).toEqual({ days: 8, hours: 0, minutes: 41 });
});




