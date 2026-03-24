import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Switch } from "../components/ui/switch";
import { Zap, Plus } from "lucide-react";

const automations = [
  {
    id: 1,
    name: "Auto-assign urgent tickets",
    description: "Automatically assign urgent priority tickets to senior agents",
    enabled: true,
    triggers: "When priority is Urgent",
    actions: "Assign to senior agent pool",
  },
  {
    id: 2,
    name: "SLA reminder notifications",
    description: "Send notifications to agents when tickets are approaching SLA deadline",
    enabled: true,
    triggers: "2 hours before SLA deadline",
    actions: "Send email and in-app notification",
  },
  {
    id: 3,
    name: "Auto-close resolved tickets",
    description: "Automatically close tickets marked as resolved after 48 hours",
    enabled: false,
    triggers: "48 hours after resolved status",
    actions: "Change status to Closed",
  },
  {
    id: 4,
    name: "Customer satisfaction survey",
    description: "Send CSAT survey after ticket is closed",
    enabled: true,
    triggers: "When ticket is closed",
    actions: "Send survey email to customer",
  },
];

export function AutomationPage() {
  return (
    <div className="h-full overflow-auto bg-[#f8f9fb]">
      <div className="p-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-[#137A87] mb-2">Automation</h1>
            <p className="text-slate-600">Streamline your workflow with automated rules</p>
          </div>
          <Button className="gap-2 bg-[#4CC9B5] hover:bg-[#4CC9B5]/90 shadow-sm rounded-lg">
            <Plus className="w-4 h-4" />
            Create Automation
          </Button>
        </div>

        <div className="space-y-4">
          {automations.map((automation) => (
            <Card key={automation.id} className="p-6 border-[#137A87]/10 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8ED1C9]/10 to-[#4CC9B5]/10 flex items-center justify-center flex-shrink-0 shadow-sm border border-[#8ED1C9]/20">
                  <Zap className="w-6 h-6 text-[#8ED1C9]" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-[#137A87]">{automation.name}</h3>
                    <Badge variant={automation.enabled ? "default" : "secondary"} className={automation.enabled ? "bg-[#4CC9B5] text-white" : "bg-slate-100 text-slate-700"}>
                      {automation.enabled ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">{automation.description}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="p-3 rounded-lg bg-[#f8f9fb] border border-[#137A87]/10">
                      <p className="text-slate-500 mb-1 font-medium">Trigger</p>
                      <p className="text-[#137A87]">{automation.triggers}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-[#f8f9fb] border border-[#137A87]/10">
                      <p className="text-slate-500 mb-1 font-medium">Action</p>
                      <p className="text-[#137A87]">{automation.actions}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Switch checked={automation.enabled} />
                  <Button variant="outline" size="sm" className="border-[#137A87]/20 hover:bg-[#f8f9fb] rounded-lg">
                    Edit
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}