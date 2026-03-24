import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Switch } from "../components/ui/switch";

export function SettingsPage() {
  return (
    <div className="h-full overflow-auto bg-[#f8f9fb]">
      <div className="p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-semibold text-[#137A87] mb-2">Settings</h1>
          <p className="text-slate-600">Manage your account and preferences</p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="bg-white border border-[#137A87]/10 p-1">
            <TabsTrigger value="general" className="data-[state=active]:bg-[#137A87] data-[state=active]:text-white">General</TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-[#137A87] data-[state=active]:text-white">Notifications</TabsTrigger>
            <TabsTrigger value="team" className="data-[state=active]:bg-[#137A87] data-[state=active]:text-white">Team</TabsTrigger>
            <TabsTrigger value="integrations" className="data-[state=active]:bg-[#137A87] data-[state=active]:text-white">Integrations</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card className="p-6 border-[#137A87]/10 shadow-sm bg-white">
              <h3 className="font-semibold text-[#137A87] mb-6">Organization Details</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="org-name" className="font-medium text-[#137A87]">Organization Name</Label>
                  <Input id="org-name" defaultValue="Acme Corporation" className="rounded-lg border-[#137A87]/20 focus:border-[#4CC9B5] focus:ring-[#4CC9B5]/20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="org-email" className="font-medium text-[#137A87]">Support Email</Label>
                  <Input id="org-email" type="email" defaultValue="support@acme.com" className="rounded-lg border-[#137A87]/20 focus:border-[#4CC9B5] focus:ring-[#4CC9B5]/20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="org-timezone" className="font-medium text-[#137A87]">Timezone</Label>
                  <Input id="org-timezone" defaultValue="America/New_York (EST)" className="rounded-lg border-[#137A87]/20 focus:border-[#4CC9B5] focus:ring-[#4CC9B5]/20" />
                </div>
                <Button className="bg-[#4CC9B5] hover:bg-[#4CC9B5]/90 shadow-sm rounded-lg">Save Changes</Button>
              </div>
            </Card>

            <Card className="p-6 border-[#137A87]/10 shadow-sm bg-white">
              <h3 className="font-semibold text-[#137A87] mb-6">Business Hours</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-[#f8f9fb] border border-[#137A87]/10">
                  <div>
                    <p className="font-semibold text-[#137A87]">Monday - Friday</p>
                    <p className="text-sm text-slate-500">9:00 AM - 6:00 PM EST</p>
                  </div>
                  <Button variant="outline" size="sm" className="border-[#137A87]/20 hover:bg-white rounded-lg">Edit</Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[#137A87]">Weekend Support</p>
                    <p className="text-sm text-slate-500">Currently disabled</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="p-6 border-[#137A87]/10 shadow-sm bg-white">
              <h3 className="font-semibold text-[#137A87] mb-6">Email Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg hover:bg-[#f8f9fb] transition-colors">
                  <div>
                    <p className="font-semibold text-[#137A87]">New ticket assigned</p>
                    <p className="text-sm text-slate-500">Receive email when a ticket is assigned to you</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between p-4 rounded-lg hover:bg-[#f8f9fb] transition-colors">
                  <div>
                    <p className="font-semibold text-[#137A87]">SLA breach warnings</p>
                    <p className="text-sm text-slate-500">Get notified before SLA deadlines</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between p-4 rounded-lg hover:bg-[#f8f9fb] transition-colors">
                  <div>
                    <p className="font-semibold text-[#137A87]">Daily summary</p>
                    <p className="text-sm text-slate-500">Daily digest of ticket activity</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <Card className="p-6 border-[#137A87]/10 shadow-sm bg-white">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-[#137A87]">Team Members</h3>
                <Button size="sm" className="bg-[#4CC9B5] hover:bg-[#4CC9B5]/90 shadow-sm rounded-lg">Invite Member</Button>
              </div>
              <div className="space-y-3">
                {['Sarah Chen', 'Michael Torres', 'Emily Watson', 'David Kim'].map((name) => (
                  <div key={name} className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-[#f8f9fb] transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4CC9B5] to-[#8ED1C9] flex items-center justify-center text-white text-sm font-semibold shadow-sm">
                        {name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-[#137A87]">{name}</p>
                        <p className="text-sm text-slate-500">Agent</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-[#137A87]/20 hover:bg-white rounded-lg">Manage</Button>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <Card className="p-6 border-[#137A87]/10 shadow-sm bg-white">
              <h3 className="font-semibold text-[#137A87] mb-6">Available Integrations</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-[#137A87]/10 hover:shadow-sm transition-shadow">
                  <div>
                    <p className="font-semibold text-[#137A87]">Slack</p>
                    <p className="text-sm text-slate-500">Get notifications in Slack</p>
                  </div>
                  <Button variant="outline" size="sm" className="border-[#137A87]/20 hover:bg-[#f8f9fb] rounded-lg">Connect</Button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border border-[#137A87]/10 hover:shadow-sm transition-shadow">
                  <div>
                    <p className="font-semibold text-[#137A87]">Zapier</p>
                    <p className="text-sm text-slate-500">Automate workflows with Zapier</p>
                  </div>
                  <Button variant="outline" size="sm" className="border-[#137A87]/20 hover:bg-[#f8f9fb] rounded-lg">Connect</Button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border border-[#137A87]/10 hover:shadow-sm transition-shadow">
                  <div>
                    <p className="font-semibold text-[#137A87]">Jira</p>
                    <p className="text-sm text-slate-500">Sync tickets with Jira issues</p>
                  </div>
                  <Button variant="outline" size="sm" className="border-[#137A87]/20 hover:bg-[#f8f9fb] rounded-lg">Connect</Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}