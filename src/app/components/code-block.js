import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'; // You can choose different styles

// const useStyles = makeStyles((theme) => ({
//     codeContainer: {
//         backgroundColor: theme.palette.background.paper,
//         padding: theme.spacing(2),
//         borderRadius: theme.shape.borderRadius,
//         overflowX: 'auto',
//     },
// }));

const CodeBlock = ({ language, code }) => {

    return (
        <SyntaxHighlighter language={language} style={docco} >
            {code}
        </SyntaxHighlighter>
    );
};

export default CodeBlock;
