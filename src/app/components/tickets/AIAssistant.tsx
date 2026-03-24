import { Button } from "../ui/button";
import { Sparkles, Copy } from "lucide-react";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useState } from "react";

export function AIAssistant() {
  const [suggestions] = useState([
    {
      type: "reply",
      text: "Thank you for bringing this to our attention. I've escalated this issue to our engineering team and will update you within 2 hours.",
    },
    {
      type: "action",
      text: "Consider assigning to Senior Agent based on technical complexity",
    },
  ]);

  return (
    <div className="space-y-4">
      <Separator />
      
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8ED1C9] to-[#4CC9B5] flex items-center justify-center shadow-sm">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <h4 className="text-sm font-semibold text-[#137A87]">AI Assistant</h4>
          <Badge variant="secondary" className="text-xs bg-[#8ED1C9]/10 text-[#8ED1C9] border-[#8ED1C9]/30">
            Beta
          </Badge>
        </div>

        <div className="space-y-3">
          {suggestions.map((suggestion, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-gradient-to-br from-[#8ED1C9]/5 to-[#4CC9B5]/5 border border-[#8ED1C9]/20 shadow-sm"
            >
              <div className="flex items-start gap-2 mb-2">
                <Badge variant="outline" className="text-xs bg-white font-medium border-[#8ED1C9]/30">
                  {suggestion.type === 'reply' ? '✨ Smart Reply' : '💡 Suggestion'}
                </Badge>
              </div>
              <p className="text-sm text-[#137A87] mb-3 leading-relaxed">
                {suggestion.text}
              </p>
              {suggestion.type === 'reply' && (
                <Button variant="outline" size="sm" className="gap-2 w-full border-[#8ED1C9]/30 hover:bg-white rounded-lg">
                  <Copy className="w-3 h-3" />
                  Use this reply
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}