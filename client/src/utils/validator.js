export function validator(data, config) {
    const errors = {};
    function validate(validateMethod, data, config) {
        let statusValidate;
        switch (validateMethod) {
        case "isRequired": {
            if (typeof data === "boolean") {
                statusValidate = !data;
            } else {
                statusValidate = data.toString().trim() === "";
            }
            break;
        }
        case "isEmail": {
            const isEmailReg = /^\S+@\S+\.\S+$/g;
            statusValidate = !isEmailReg.test(data);
            break;
        }
        case "isCapitalSymbol": {
            const capitalRegExp = /[A-Z]+/g;
            statusValidate = !capitalRegExp.test(data);
            break;
        }
        case "isContainDigital": {
            const containDigit = /\d+/g;
            statusValidate = !containDigit.test(data);
            break;
        }
        case "minSymbols":
            statusValidate = data.length < config.value;
            break;
        case "isDifference":
            statusValidate = data !== config.passwordValue;
            break;
        default:
            break;
        }
        if (statusValidate) {
            return config.message;
        }
    }
    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(
                validateMethod,
                data[fieldName],
                config[fieldName][validateMethod]
            );
            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        }
    }
    return errors;
}
