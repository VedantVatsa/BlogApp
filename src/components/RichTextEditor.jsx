import { useRef, useCallback, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import DOMPurify from "dompurify";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = ({ value, onChange }) => {
  const quillRef = useRef(null);

  // Sanitize content before rendering
  const sanitizeContent = (content) => {
    return DOMPurify.sanitize(content, {
      ALLOWED_TAGS: [
        "p",
        "h1",
        "h2",
        "h3",
        "strong",
        "em",
        "u",
        "blockquote",
        "ol",
        "ul",
        "li",
        "img",
      ],
      ALLOWED_ATTR: ["src", "alt", "class", "data-size"],
    });
  };

  // Handle initial focus and selection
  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      editor.focus();
      const length = editor.getLength();
      editor.setSelection(length, length);
    }
  }, []);

  // Modify handleImage to sanitize image URLs
  const handleImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      try {
        const reader = new FileReader();
        reader.onload = () => {
          if (!quillRef.current) return;

          const editor = quillRef.current.getEditor();
          const range = editor.getSelection() || {
            index: editor.getLength(),
            length: 0,
          };

          // Sanitize image data URL
          const sanitizedUrl = DOMPurify.sanitize(reader.result);

          // Insert a line break and the image
          editor.insertText(range.index, "\n", "user");
          editor.insertEmbed(range.index + 1, "image", sanitizedUrl);
          editor.insertText(range.index + 2, "\n", "user");

          // Add image layout controls
          const img = editor.root.querySelector(`img[src="${sanitizedUrl}"]`);
          if (img) {
            img.setAttribute("data-size", "medium");
            const layouts = ["full", "wide", "medium", "small"];

            const toolbar = document.createElement("div");
            toolbar.className = "image-toolbar flex gap-2 justify-center my-2";
            toolbar.innerHTML = layouts
              .map(
                (size) => `
              <button class="px-3 py-1 rounded text-sm ${
                size === "medium" ? "bg-blue-500 text-white" : "bg-gray-100"
              }"
                      data-size="${size}">
                ${size.charAt(0).toUpperCase() + size.slice(1)}
              </button>
            `
              )
              .join("");

            img.parentNode.insertBefore(toolbar, img.nextSibling);

            toolbar.addEventListener("click", (e) => {
              const button = e.target.closest("button");
              if (!button) return;

              const size = button.dataset.size;
              img.setAttribute("data-size", size);

              // Update toolbar buttons
              toolbar.querySelectorAll("button").forEach((btn) => {
                btn.className = `px-3 py-1 rounded text-sm ${
                  btn.dataset.size === size
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                }`;
              });
            });
          }

          editor.setSelection(range.index + 1, 0);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    };
  }, []);

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        image: handleImage,
      },
    },
    clipboard: {
      matchVisual: false,
    },
    keyboard: {
      bindings: {
        // Add custom key bindings here if needed
      },
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "bullet",
    "align",
    "link",
    "image",
  ];

  const handleChange = useCallback(
    (content, delta, source, editor) => {
      // Sanitize content before passing to parent
      const sanitizedContent = sanitizeContent(content);
      onChange(sanitizedContent);
    },
    [onChange]
  );

  return (
    <div className="rich-text-editor">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={sanitizeContent(value || "")}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        className="bg-white rounded-lg"
        preserveWhitespace
        placeholder="Write your story..."
      />
    </div>
  );
};

export default RichTextEditor;
