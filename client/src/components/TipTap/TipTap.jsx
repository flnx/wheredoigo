import { EditorContent, useEditor } from '@tiptap/react';
import CharacterCount from '@tiptap/extension-character-count';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import StarterKit from '@tiptap/starter-kit';

// Icons
import {
    ListBullets,
    ListNumbers,
    TextB,
    TextHOne,
    TextHThree,
    TextHTwo,
    TextItalic,
} from '@phosphor-icons/react';

import './styles.scss';

const MenuBar = ({ editor }) => {
    if (!editor) {
        return null;
    }

    return (
        <div className="buttons">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? 'is-active' : ''}
            >
                <TextB weight="bold" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'is-active' : ''}
            >
                <TextItalic />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
            >
                <TextHOne weight="bold" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
            >
                <TextHTwo weight="bold" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
            >
                <TextHThree weight="bold" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'is-active' : ''}
            >
                <ListBullets />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? 'is-active' : ''}
            >
                <ListNumbers />
            </button>
        </div>
    );
};

export const TipTap = ({ onChangeHandler }) => {
    const editor = useEditor({
        extensions: [
            TextStyle.configure({ types: [ListItem.name] }),
            StarterKit.configure({
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
                },
                orderedList: {
                    keepMarks: true,
                    keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
                },
            }),
            CharacterCount.configure({
                limit: 5000,
            }),
        ],
        content: ``,

        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            const charCounter = editor?.storage.characterCount.characters();

            onChangeHandler(html, charCounter);
        },
    });

    return (
        <div className="editor">
            <EditorContent editor={editor} />
            <div className="character-count">
                <div>
                    {editor?.storage.characterCount.characters()}/{5000} characters
                </div>

            </div>
            <MenuBar editor={editor} />
        </div>
    );
};
