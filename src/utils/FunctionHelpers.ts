import { ContentState, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { RawDraftContentState } from 'react-draft-wysiwyg';
import dayjs from 'dayjs';
import { Dayjs } from 'dayjs';

export const editorToHtml = (rawContentState: RawDraftContentState | null) => {
	if (!rawContentState) return '';
	return draftToHtml(rawContentState);
};

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

export const parseDayjsToString = (value: string | Dayjs | undefined) => {
	return dayjs(value).format('YYYY-MM-DD') as string;
}

export const formatDate = (date: string | undefined) => {
    if (!date) return '';
    const parsedDate = new Date(date);
    const formatter = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    return formatter.format(parsedDate);
}

export const parseHTML = (html: string | undefined) => {
    return { __html: html || '' };
}