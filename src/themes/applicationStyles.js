import { fontFamilies } from './fonts'
import colors from './colors'

export default {
    outer: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginBottom: '40px',
    },
    mainTextContainer: {
        // ...fontFamilies.comfortaa,
        // TODO: sort this out. 90% is a hack
        width: '100%',
        margin: '0 auto',
        alignSelf: 'stretch',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
    },
    link: {
        color: colors.darkGrey,
        textDecoration: 'none',
        fontFamily: 'Josefin Sans',
        fontWeight: 'light',
        borderBottom: `1px solid ${colors.lightGrey}`,
        ':hover': {
            color: colors.lightGrey,
          textDecoration: 'none',
          borderBottom: `1px solid ${colors.lightGrey}`,
        },
        ':active': {
          color: colors.lightGrey,
          textDecoration: 'none',
          borderBottom: `1px solid ${colors.lightGrey}`,
        },
        ':focus': {
          color: colors.lightGrey,
          textDecoration: 'none',
          borderBottom: `1px solid ${colors.lightGrey}`,
        },
    },
}