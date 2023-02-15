export function checkInputString(text : string, minlength: number, maxlength: number) : boolean {
    console.log(text)
    return text.length >= minlength && text.length <= maxlength
}