export const dateValidator = (content: string) => {
    const regex = /\d{1,2}\/\d{1,2}\/\d{2,4}/g;
    const date = content.match(regex)
    return  date ? date.join(', ') : ''
}