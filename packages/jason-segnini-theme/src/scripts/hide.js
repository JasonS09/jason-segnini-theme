export const hide = (
    isComponentHidden, 
    setHideStyles, 
    iconPadding, 
    setMargin,
    outerStyles,
    toggleHideComponent
    ) => {
    if (isComponentHidden) {
        setHideStyles({iconPadding: iconPadding})
        setMargin('-250px')
        setTimeout(() => {
            setHideStyles(
                hideStyles => ({...hideStyles, outer: outerStyles})
            )
        }, 725)
    }
    else {
        setHideStyles(hideStyles => 
            ({...hideStyles, iconPadding: ''})
        )
        setMargin('0')
        setTimeout(() => {setHideStyles({})}, 300)
    }
    toggleHideComponent()
}