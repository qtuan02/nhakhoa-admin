import { ContentState, convertFromHTML, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { RawDraftContentState } from 'react-draft-wysiwyg';

export const editorToHtml = (rawContentState: RawDraftContentState | null) => {
	if (!rawContentState) return '';
	return draftToHtml(rawContentState);
};

// export const htmlToEditor = (html: string) => {
// 	const blocksFromHTML = convertFromHTML(html);
// 	const contentState = ContentState.createFromBlockArray(
//         blocksFromHTML.contentBlocks,
//         blocksFromHTML.entityMap
//     );
//     return EditorState.createWithContent(contentState);
// };

export const htmlToEditor = (html: string) => {
	if (!html) return EditorState.createEmpty();
	const blocksFromHtml = htmlToDraft(html);
	const { contentBlocks, entityMap } = blocksFromHtml;
	const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
	return EditorState.createWithContent(contentState);
};

export const formatterInputNumber = (value: number | undefined) => {
	if (value) {
		return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
	}
	return '0';
};

export const parserInputNumber = (value: string | undefined) => {
	if (value) {
		return Number(value.replace(/\./g, ''));
	}
	return 0;
};

export const customNumberPrice = (value: number | undefined) => {
	return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(value));
}