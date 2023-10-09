"use client";
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/js/plugins.pkgd.min.js";

// Require Editor CSS files.

import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";

import { useState, type ComponentPropsWithoutRef, type FC } from "react";
import Froala from "react-froala-wysiwyg";
import FroalaPreview from "react-froala-wysiwyg/FroalaEditorView";
import { twMerge } from "tailwind-merge";

export interface EditorProps extends ComponentPropsWithoutRef<"div"> {
  onSave: (model: string) => void;
  content?: string;
}

const baseConfig = {
  attribution: false,
  quickInsertEnabled: false,
  colorsStep: 5,
  colorsText: [
    "#000000",
    "#2C2E2F",
    "#6C7378",
    "#FFFFFF",
    "#009CDE",
    "#003087",
    "#FF9600",
    "#00CF92",
    "#DE0063",
    "#640487",
    "REMOVE",
  ],
  colorsBackground: [
    "#000000",
    "#2C2E2F",
    "#6C7378",
    "#FFFFFF",
    "#009CDE",
    "#003087",
    "#FF9600",
    "#00CF92",
    "#DE0063",
    "#640487",
    "REMOVE",
  ],
  toolbarButtons: {
    moreText: {
      buttons: [
        "paragraphFormat",
        "fontSize",
        "textColor",
        "backgroundColor",
        "alignLeft",
        "alignRight",
        "alignJustify",
        "formatOL",
        "formatUL",
        "indent",
        "outdent",
      ],
      buttonsVisible: 6,
    },
    moreRich: {
      buttons: [
        "|",
        "bold",
        "italic",
        "underline",
        "insertHR",
        "insertLink",
        "insertTable",
      ],
      name: "additionals",
      buttonsVisible: 3,
    },
    dummySection: {
      buttons: ["|"],
    },
    moreMisc: {
      buttons: ["|", "undo", "redo", "help", "|"],
      align: "right",
      buttonsVisible: 2,
    },
  },
  tableEditButtons: [
    "tableHeader",
    "tableRemove",
    "tableRows",
    "tableColumns",
    "tableStyle",
    "-",
    "tableCells",
    "tableCellBackground",
    "tableCellVerticalAlign",
    "tableCellHorizontalAlign",
  ],
  tableStyles: {
    grayTableBorder: "Gray Table Border",
    blackTableBorder: "Black Table Border",
    noTableBorder: "No Table Border",
  },
  toolbarSticky: true,
  pluginsEnabled: [
    "align",
    "colors",
    "entities",
    "fontSize",
    "help",
    "link",
    "lists",
    "paragraphFormat",
    "paragraphStyle",
    "save",
    "table",
    "wordPaste",
  ],
};

export const Editor: FC<EditorProps> = (props) => {
  const { content, placeholder, onSave, ...rest } = props;
  const [model, setModel] = useState(content || "");
  const [isPreview, setIsPreview] = useState(true);

  const blurHandler = () => {
    onSave(model);
    setIsPreview(true);
  };

  return (
    <>
      <div {...rest}>
        {!isPreview && (
          <Froala
            tag="textarea"
            config={{
              ...baseConfig,
              height: 200,
              events: { blur: blurHandler },
              placeholderText: placeholder,
            }}
            model={model}
            onModelChange={setModel}
          />
        )}
        {isPreview && (
          <div
            className={twMerge(
              "min-h-[200px] border rounded-sm py-2 px-4",
              !model && "text-gray-400"
            )}
            onDoubleClick={() => setIsPreview(false)}
          >
            <FroalaPreview model={model || placeholder} />
          </div>
        )}
      </div>
    </>
  );
};

export default Editor;
