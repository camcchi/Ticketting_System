import { Ticket } from "../../types";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Reply, UserPlus, CheckCircle, ArrowUp, StickyNote, Paperclip } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface QuickActionsProps {
  ticket: Ticket;
}

export function QuickActions({ ticket }: QuickActionsProps) {
  const [replyText, setReplyText] = useState("");
  const [noteText, setNoteText] = useState("");

  return (
    <div className="border-t border-[#137A87]/10 bg-white">
      <Tabs defaultValue="reply" className="w-full">
        <div className="px-6 pt-4">
          <TabsList className="grid w-full grid-cols-2 bg-[#f8f9fb]">
            <TabsTrigger value="reply" className="gap-2 data-[state=active]:bg-white">
              <Reply className="w-4 h-4" />
              Reply
            </TabsTrigger>
            <TabsTrigger value="note" className="gap-2 data-[state=active]:bg-white">
              <StickyNote className="w-4 h-4" />
              Internal Note
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="reply" className="p-6 pt-4 space-y-4">
          <Textarea
            placeholder="Type your reply to the customer..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="min-h-[100px] resize-none rounded-lg border-[#137A87]/20 focus:border-[#4CC9B5] focus:ring-2 focus:ring-[#4CC9B5]/20"
          />
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" className="gap-2 hover:bg-[#f8f9fb] rounded-lg">
              <Paperclip className="w-4 h-4" />
              Attach
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="rounded-lg border-[#137A87]/20">
                Save Draft
              </Button>
              <Button size="sm" className="gap-2 bg-[#4CC9B5] hover:bg-[#4CC9B5]/90 rounded-lg shadow-sm">
                <Reply className="w-4 h-4" />
                Send Reply
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="note" className="p-6 pt-4 space-y-4">
          <Textarea
            placeholder="Add an internal note (not visible to customer)..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            className="min-h-[100px] resize-none rounded-lg border-[#137A87]/20 focus:border-[#4CC9B5] focus:ring-2 focus:ring-[#4CC9B5]/20"
          />
          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" size="sm" className="rounded-lg border-[#137A87]/20">
              Cancel
            </Button>
            <Button size="sm" className="gap-2 bg-[#4CC9B5] hover:bg-[#4CC9B5]/90 rounded-lg shadow-sm">
              <StickyNote className="w-4 h-4" />
              Add Note
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <div className="px-6 pb-5 flex gap-2 border-t border-[#137A87]/10 pt-4">
        <Button variant="outline" size="sm" className="gap-2 rounded-lg border-[#137A87]/20 hover:bg-[#f8f9fb]">
          <UserPlus className="w-4 h-4" />
          Assign
        </Button>
        <Button variant="outline" size="sm" className="gap-2 rounded-lg border-[#137A87]/20 hover:bg-[#f8f9fb]">
          <ArrowUp className="w-4 h-4" />
          Escalate
        </Button>
        <Button variant="outline" size="sm" className="gap-2 text-[#4CC9B5] hover:text-[#4CC9B5]/90 border-[#4CC9B5]/30 hover:bg-[#4CC9B5]/5 rounded-lg">
          <CheckCircle className="w-4 h-4" />
          Resolve
        </Button>
      </div>
    </div>
  );
}