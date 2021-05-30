let required = (propertyType) =>{
    return v => v && v.lenght > 0 || `You must input a ${propertyType}`
}
let minLength =(propertyType, minLenght) =>{
    return v => v && v.lenght >= minLength || `${propertyType} must be at least ${minLength}`
}
let maxLength = (propertyType, maxLenght) =>{
    return v => v && v.lenght <= maxLength || `${propertytype} must be less than ${maxLength}`
}
let emailFormat = () =>{
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,24})+$/
    return v => v && regex.test(v) || "Votre email n'est pas valide"
}

export default {
    required,
    minLength,
    maxLength,
    emailFormat
}