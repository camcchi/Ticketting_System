import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Upload, AlertCircle, ArrowDownCircle } from "lucide-react";

export function ImportContactsModal({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-white gap-0 border-slate-200">
        <DialogHeader className="px-6 py-4 border-b border-transparent pb-2">
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold text-[#0B3A42]">
            <ArrowDownCircle className="w-6 h-6 text-slate-400 font-light" strokeWidth={1.5} />
            Import contacts
          </DialogTitle>
        </DialogHeader>
        
        <div className="px-6 py-4 flex flex-col gap-6">
          <p className="text-sm text-slate-700 leading-relaxed">
            From here, you can import contacts into A.S.S.I.S.T using a CSV. Take a look at{" "}
            <a href="#" className="text-[#137A87] hover:underline">this article</a>{" "}
            before you prepare the CSV file for importing. Make sure the CSV is encoded in UTF-8 and
            the header row has the contact labels listed (name, email, etc.)
          </p>

          <div className="bg-slate-50 border border-transparent rounded-lg p-10 flex flex-col items-center justify-center gap-3">
            <Upload className="w-8 h-8 text-slate-400 stroke-1" />
            <div className="flex flex-col items-center gap-1">
              <button className="text-[#137A87] text-sm hover:underline font-medium">Upload a file</button>
              <span className="text-slate-400 text-sm">or drag and drop your CSV file here</span>
            </div>
          </div>

          <div className="border border-slate-200 rounded-lg p-4 bg-white mb-2">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1.5">
                <h4 className="text-[15px] font-semibold text-[#0B3A42]">Important note</h4>
                <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                  <li>If an existing contact is found in the CSV file, their information will be updated in A.S.S.I.S.T</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
