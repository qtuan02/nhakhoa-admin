import { EditorState } from "draft-js";
import React, { useEffect, useState } from "react";
import { Editor, EditorProps } from "react-draft-wysiwyg";


interface CEditorProps extends EditorProps {
	initialDes?: EditorState;
}

const CEditor:  React.FC<CEditorProps> = (props) => {
	const { initialDes } = props;
	const [ editorState, setEditorState ] = useState(EditorState.createEmpty());

	useEffect(() => {
		if (initialDes) {
            setEditorState(initialDes);
        }
	}, [initialDes]);

	return (
		<Editor
		    editorState={ editorState }
			onEditorStateChange={ (state: EditorState) => setEditorState(state) }
			wrapperStyle={{ border: "1px solid #000" }}
			editorStyle={{ padding: "0px 12px", height: "350px" }}
			{...props}
		/>
	);
};

export default CEditor;