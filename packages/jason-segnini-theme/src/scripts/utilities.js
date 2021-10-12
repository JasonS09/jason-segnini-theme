export const select = () => {
    if (window.getSelection)
        return window.getSelection()

    if (document.getSelection) 
        return document.getSelection()
        
    if (document.selection) 
        return document.selection.createRange().text
}

export const getQuote = (author, content) => {
    console.log(content)
    const text = `${author} said:\r\n\r\n${content}`
    const paragraphs = text.split(/\r?\n/)
    return paragraphs.map((p, i) =>
        i < paragraphs.length-1 ? `>${p}\r\n` : `>${p}\r\n\r\n`
    ).join('')
}