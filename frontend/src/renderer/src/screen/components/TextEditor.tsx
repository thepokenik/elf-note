import React from 'react';
import AceEditor from 'react-ace'

const TextEditor: React.FC = () =>{
    return (
      <AceEditor
        mode='javascript'
        theme='github' />
    );
}

export default TextEditor;