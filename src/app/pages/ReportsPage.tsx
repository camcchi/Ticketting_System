import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Download, FileText, Calendar, Filter } from "lucide-react";
import { Badge } from "../components/ui/badge";

const reports = [
  {
    id: 1,
    name: "Weekly Performance Report",
    description: "Team performance metrics for the week",
    date: "Mar 10 - Mar 17, 2026",
    status: "ready",
  },
  {
    id: 2,
    name: "Customer Satisfaction Survey",
    description: "CSAT scores and feedback summary",
    date: "March 2026",
    status: "ready",
  },
  {
    id: 3,
    name: "SLA Compliance Report",
    description: "Service level agreement adherence metrics",
    date: "March 2026",
    status: "generating",
  },
  {
    id: 4,
    name: "Agent Activity Report",
    description: "Individual agent performance and ticket handling",
    date: "Mar 10 - Mar 17, 2026",
    status: "ready",
  },
];

export function ReportsPage() {
  return (
    <div className="h-full overflow-auto bg-[#f8f9fb]">
      <div className="p-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-[#137A87] mb-2">Reports</h1>
            <p className="text-slate-600">Generate and download detailed reports</p>
          </div>
          <Button className="gap-2 bg-[#4CC9B5] hover:bg-[#4CC9B5]/90 shadow-sm rounded-lg">
            <FileText className="w-4 h-4" />
            Create Custom Report
          </Button>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="gap-2 border-[#137A87]/20 hover:bg-white rounded-lg">
            <Calendar className="w-4 h-4" />
            Date Range
          </Button>
          <Button variant="outline" size="sm" className="gap-2 border-[#137A87]/20 hover:bg-white rounded-lg">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>

        <div className="space-y-4">
          {reports.map((report) => (
            <Card key={report.id} className="p-6 border-[#137A87]/10 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-[#137A87]">{report.name}</h3>
                    {report.status === 'ready' ? (
                      <Badge variant="outline" className="bg-[#4CC9B5]/10 text-[#4CC9B5] border-[#4CC9B5]/30 font-medium">
                        Ready
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 font-medium">
                        Generating
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 mb-1">{report.description}</p>
                  <p className="text-sm text-slate-500 font-medium">{report.date}</p>
                </div>

                <div className="flex gap-2">
                  {report.status === 'ready' && (
                    <>
                      <Button variant="outline" size="sm" className="border-[#137A87]/20 hover:bg-[#f8f9fb] rounded-lg">
                        View
                      </Button>
                      <Button size="sm" className="gap-2 bg-[#4CC9B5] hover:bg-[#4CC9B5]/90 shadow-sm rounded-lg">
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}