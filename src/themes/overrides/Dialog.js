export default function Dialog(theme) {
    const { palette, typography, customShadows, shape: { borderRadius }, } = theme;

    return {
        components: {
            MuiDialog: {
                styleOverrides: {
                    root: {
                        // backgroundColor: 'lightblue',
                    },
                    "& .MuiDialog-paper": {
                        padding: "25px"
                    }
                },
            },
            MuiDialogTitle: {
                styleOverrides: {
                    root: {
                        color: 'red',
                    },
                },
            },
            MuiDialogContent: {
                styleOverrides: {
                    root: {
                        padding: '16px',
                    },
                },
            },
            MuiDialogActions: {
                styleOverrides: {
                    root: {
                        justifyContent: 'flex-end',
                    },
                },
            },
        },
    };
}