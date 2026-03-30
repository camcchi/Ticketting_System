import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Plus, Minus, User } from "lucide-react";

interface InviteAgentsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface InviteRow {
  id: string;
  email: string;
  role: string;
}

export function InviteAgentsModal({ open, onOpenChange }: InviteAgentsModalProps) {
  const [invites, setInvites] = useState<InviteRow[]>([
    { id: "1", email: "", role: "Agent" }
  ]);

  const addRow = () => {
    setInvites([...invites, { id: Math.random().toString(36).substr(2, 9), email: "", role: "Agent" }]);
  };

  const removeRow = (id: string) => {
    if (invites.length > 1) {
      setInvites(invites.filter((row) => row.id !== id));
    }
  };

  const updateRow = (id: string, field: "email" | "role", value: string) => {
    setInvites(invites.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setInvites([{ id: "1", email: "", role: "Agent" }]);
    }, 300);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-in fade-in" />
        <Dialog.Content
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <div className="relative w-full max-w-[520px] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Header Area */}
            <div className="px-8 pt-8 pb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                  <User className="w-6 h-6 text-[#0F2D40]" />
                </div>
                <Dialog.Title className="text-[24px] font-bold text-[#0B2545]">
                  Invite Agents
                </Dialog.Title>
              </div>
              <p className="text-[14px] text-slate-500">
                Invite agents and assign roles. Manage your team from{" "}
                <button className="text-[#2D4E77] font-semibold hover:underline">Admin &gt; Agents</button>
              </p>
            </div>

            {/* Email & Role Body */}
            <div className="px-8 py-4 space-y-4 max-h-[400px] overflow-y-auto">
              {invites.map((row) => (
                <div key={row.id} className="flex items-end gap-3 group">
                  <div className="flex-1">
                    <label className="block text-[13px] font-bold text-slate-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder=""
                      value={row.email}
                      onChange={(e) => updateRow(row.id, "email", e.target.value)}
                      className="w-full text-[14px] border border-slate-300 rounded-lg px-3 py-2.5 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#2D4E77]/30 focus:border-[#2D4E77] transition-all"
                    />
                  </div>
                  <div className="w-[180px]">
                    <label className="block text-[13px] font-bold text-slate-700 mb-2">
                      Role <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={row.role}
                        onChange={(e) => updateRow(row.id, "role", e.target.value)}
                        className="w-full text-[14px] border border-slate-300 rounded-lg px-3 py-2.5 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#2D4E77]/30 focus:border-[#2D4E77] transition-all appearance-none cursor-pointer"
                      >
                        <option value="Agent">Agent</option>
                        <option value="Admin">Admin</option>
                        <option value="Supervisor">Supervisor</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeRow(row.id)}
                    className="w-9 h-9 flex items-center justify-center bg-slate-100 rounded-full text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors shrink-0 mb-0.5"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {/* Add Button Row */}
              <button
                onClick={addRow}
                className="w-full flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-100 rounded-lg text-[#2D4E77] font-semibold text-[14px] hover:bg-slate-100 transition-colors"
              >
                <div className="w-5 h-5 rounded-full border-2 border-[#2D4E77] flex items-center justify-center">
                  <Plus className="w-3.5 h-3.5 stroke-[3px]" />
                </div>
                Add
              </button>
            </div>

            {/* Footer */}
            <div className="mt-4 px-8 py-6 bg-[#F8FAFB] flex items-center justify-end gap-3 border-t border-slate-100">
              <button
                onClick={handleClose}
                className="px-6 py-2.5 text-sm font-semibold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors min-w-[100px]"
              >
                Cancel
              </button>
              <button
                disabled={invites.some(r => !r.email)}
                className="px-8 py-2.5 text-sm font-bold rounded-lg bg-[#2D4E77] hover:bg-[#243f61] text-white shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed min-w-[100px]"
              >
                Invite
              </button>
            </div>

          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
