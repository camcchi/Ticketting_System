import { Contact } from "../../types";
import { Checkbox } from "../ui/checkbox";
import { MoreVertical } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

interface ContactTableProps {
  contacts: Contact[];
  selectedIds: string[];
  onSelectContact: (id: string) => void;
  onSelectAll: (selected: boolean) => void;
}

export function ContactTable({ 
  contacts, 
  selectedIds, 
  onSelectContact,
  onSelectAll
}: ContactTableProps) {
  const allSelected = contacts.length > 0 && selectedIds.length === contacts.length;

  return (
    <div className="w-full overflow-auto bg-white">
      <table className="w-full border-collapse min-w-[1000px]">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/50">
            <th className="px-5 py-3 text-left w-12">
              <Checkbox 
                checked={allSelected} 
                onCheckedChange={(checked) => onSelectAll(!!checked)}
                className="rounded border-slate-300 data-[state=checked]:bg-[#137A87] data-[state=checked]:border-[#137A87]"
              />
            </th>
            <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Contact</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Title</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Company</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Email address</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Mobile phone</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Work phone</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Social Handle</th>
            <th className="px-4 py-3 w-10"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {contacts.map((contact) => (
            <tr 
              key={contact.id} 
              className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
              onClick={() => onSelectContact(contact.id)}
            >
              <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                <Checkbox 
                  checked={selectedIds.includes(contact.id)}
                  onCheckedChange={() => onSelectContact(contact.id)}
                  className="rounded border-slate-300 data-[state=checked]:bg-[#137A87] data-[state=checked]:border-[#137A87]"
                />
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8 rounded-lg shadow-sm">
                    <AvatarImage src={contact.avatar} alt={contact.name} />
                    <AvatarFallback className="bg-slate-100 text-[#137A87] font-bold text-xs rounded-lg">
                      {contact.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-bold text-[#137A87] group-hover:underline">{contact.name}</span>
                </div>
              </td>
              <td className="px-4 py-4 text-sm text-slate-600">{contact.title}</td>
              <td className="px-4 py-4 text-sm text-slate-600">{contact.company}</td>
              <td className="px-4 py-4 text-sm text-[#137A87]">{contact.email}</td>
              <td className="px-4 py-4 text-sm text-slate-400">{contact.mobilePhone}</td>
              <td className="px-4 py-4 text-sm text-slate-600">{contact.workPhone}</td>
              <td className="px-4 py-4 text-sm text-slate-400">{contact.socialHandle}</td>
              <td className="px-4 py-4 text-right">
                <button className="p-1 rounded hover:bg-slate-200 text-slate-400 hover:text-[#137A87] transition-all">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
