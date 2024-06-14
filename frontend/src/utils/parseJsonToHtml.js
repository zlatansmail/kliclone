import { generateHTML } from "@tiptap/html";
import parse from "html-react-parser";

import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";

const parseJsonToHtml = (json) => {
  return parse(generateHTML(json, [Bold, Italic, Document, Paragraph, Text]));
};

export default parseJsonToHtml;
