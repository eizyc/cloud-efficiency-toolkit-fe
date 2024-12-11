import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface CopyToolProps {
  text: string;
  children?: React.ReactNode;
}

export const CopyTool = ({ text, children }: CopyToolProps) => {
  const [copied, setCopied] = useState(false);
  const onCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  return (
    <>
      {children}
      <Button onClick={onCopy} size="xs" variant="outline" className="ml-2">
        {copied ? <Check className="w-2 h-2" /> : <Copy className="w-2 h-2" />}
      </Button>
    </>
  );
};
