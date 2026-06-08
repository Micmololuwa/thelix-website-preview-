import { useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { Bold, Italic, List, ListOrdered, Heading2, Heading3, Undo, Redo, ImagePlus, FileText } from "lucide-react";

interface Props {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

const ToolbarBtn = ({
  onClick, active, disabled, children, title,
}: {
  onClick: () => void; active?: boolean; disabled?: boolean; children: React.ReactNode; title: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`p-1.5 rounded transition-colors ${
      active ? "bg-[#F48220] text-white" : "text-black/50 hover:text-black hover:bg-gray-100"
    } disabled:opacity-30`}
  >
    {children}
  </button>
);

const DOC_EXTENSIONS = [
  ".pdf", ".doc", ".docx", ".ppt", ".pptx", ".xls", ".xlsx", ".txt", ".csv", ".zip",
];

export function RichTextEditor({ value, onChange, placeholder }: Props) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: false, allowBase64: true }),
      Placeholder.configure({ placeholder: placeholder ?? "Write here…" }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "min-h-[220px] px-4 py-3 text-sm font-jakarta text-black focus:outline-none prose prose-sm max-w-none",
      },
    },
  });

  if (!editor) return null;

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { alert("Image must be under 10 MB."); return; }
    const reader = new FileReader();
    reader.onload = () => {
      editor.chain().focus().setImage({ src: reader.result as string, alt: file.name }).run();
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleDocFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 20 * 1024 * 1024) { alert("File must be under 20 MB."); return; }
    const reader = new FileReader();
    reader.onload = () => {
      // Insert as a styled download anchor inside a paragraph
      const dataUrl = reader.result as string;
      const anchor = `<p><a href="${dataUrl}" download="${file.name}" style="display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border:1px solid #e5e7eb;border-radius:8px;font-size:13px;color:#111;text-decoration:none;background:#f9fafb;">📎 ${file.name}</a></p>`;
      editor.chain().focus().insertContent(anchor).run();
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden focus-within:border-[#F48220] transition-colors">
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 px-2 py-1.5 border-b border-gray-100 bg-gray-50 flex-wrap">
        <ToolbarBtn title="Bold" onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")}>
          <Bold size={15} />
        </ToolbarBtn>
        <ToolbarBtn title="Italic" onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")}>
          <Italic size={15} />
        </ToolbarBtn>

        <div className="w-px h-4 bg-gray-200 mx-1" />

        <ToolbarBtn title="Heading 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })}>
          <Heading2 size={15} />
        </ToolbarBtn>
        <ToolbarBtn title="Heading 3" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })}>
          <Heading3 size={15} />
        </ToolbarBtn>

        <div className="w-px h-4 bg-gray-200 mx-1" />

        <ToolbarBtn title="Bullet list" onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")}>
          <List size={15} />
        </ToolbarBtn>
        <ToolbarBtn title="Numbered list" onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")}>
          <ListOrdered size={15} />
        </ToolbarBtn>

        <div className="w-px h-4 bg-gray-200 mx-1" />

        {/* Image / GIF upload */}
        <ToolbarBtn title="Insert image or GIF" onClick={() => imageInputRef.current?.click()}>
          <ImagePlus size={15} />
        </ToolbarBtn>

        {/* Document upload */}
        <ToolbarBtn title="Attach file (PDF, DOC, etc.)" onClick={() => fileInputRef.current?.click()}>
          <FileText size={15} />
        </ToolbarBtn>

        <div className="w-px h-4 bg-gray-200 mx-1" />

        <ToolbarBtn title="Undo" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
          <Undo size={15} />
        </ToolbarBtn>
        <ToolbarBtn title="Redo" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
          <Redo size={15} />
        </ToolbarBtn>
      </div>

      {/* Editor area */}
      <EditorContent editor={editor} />

      {/* Hidden file inputs */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageFile}
        className="hidden"
      />
      <input
        ref={fileInputRef}
        type="file"
        accept={DOC_EXTENSIONS.join(",")}
        onChange={handleDocFile}
        className="hidden"
      />
    </div>
  );
}
