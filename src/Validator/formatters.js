import moment from "moment"
export const formatters= {
    fullname: ({ fullname: value }) => {
        value = value.replace(/\s+/g, ' ');
        const isValid = !!value;
        return { value, isValid };
    },
    phone: ({ phone: value }) => {
        const re = /^\+?1?(\d{10})$/;
        const isValid = re.test(value);
        if(isValid){
            value = value.replace(re, '+1$1');
            return { value, isValid: true }
        }
        return { value, isValid: false }},

    email: ({ email: value }) => {
            const match =value.toLowerCase()
            const isValid = !!value;
            return { value, isValid , match};
    },

    age: ({ age: value}) => {
        value = Number(value)
        if(value > 21 && value > 0 && Number.isInteger(value)){
            const  isValid = !!value
            return { value, isValid };
        }
        return {value, isValid : false}
    },
    experience: ({ experience: value, age }) => {
        value = Number(value)
        if (value >=0 && value < age){
            const  isValid = !!value
            return { value, isValid };
        }
        return {value, isValid : false}
    },
    yearlyincome: ({ yearlyincome: value }) => {
        value = Number.parseFloat(value).toFixed(2)
        if (value > 0 && value < 1000000){
            const  isValid = !!value
            return {value, isValid}
        }
        return {value, isValid : false}
    },
    haschildren: ({ haschildren: value }) => {
        if(value === '' || value ==='false'){
            const  isValid = !value
            return { value : 'false'  , isValid};
        }
        if(value === 'true'){
            const  isValid = !!value
            return { value , isValid};
        }
        return {value, isValid : false}
    },

    licensestates: ({ licensestates: value }) => {
        value = value.split('|').map(el=> el.trim().slice(0,2).toUpperCase()).join(' ')
        if(value){
            const  isValid = !!value
            return { value , isValid};
        }
        return {value, isValid : false}
    },

    expirationdate: ({ expirationdate: value }) => {
            const dateFormat = 'DD-MM-YYYY';
            value = moment(new Date(value)).format(dateFormat);
            moment(value, dateFormat, true).isValid();
            console.log(moment(value));
            return{value, isValid:true}
    },
    licencenumber: ({ licencenumber: value }) => {
        if(value.length === 6){
            const  isValid = !!value
            return { value , isValid};
        }
        return {value, isValid : false}
    },
};