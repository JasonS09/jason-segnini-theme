export const select = () => {
    if (window.getSelection)
        return window.getSelection()

    if (document.getSelection) 
        return document.getSelection()
        
    if (document.selection) 
        return document.selection.createRange().text
}