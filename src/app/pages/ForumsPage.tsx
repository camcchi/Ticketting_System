import { useState } from "react";
import {
  List,
  ChevronRight,
  ChevronDown,
  Plus,
  MessageSquare,
  Folder,
  FileText,
  X,
  Hash,
  BookOpen,
  Users,
  Clock,
  Trash2,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────
interface Topic {
  id: string;
  title: string;
  author: string;
  replies: number;
  createdAt: string;
}

interface Forum {
  id: string;
  name: string;
  description: string;
  topics: Topic[];
  expanded: boolean;
}

interface Category {
  id: string;
  name: string;
  forums: Forum[];
  expanded: boolean;
}

// ── Small modal helper ────────────────────────────────────────────────────
function Modal({
  title,
  onClose,
  onSubmit,
  children,
  submitLabel = "Create",
}: {
  title: string;
  onClose: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
  submitLabel?: string;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-[#137A87]">{title}</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        {children}
        <div className="flex justify-end gap-2 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="px-5 py-2 text-sm font-semibold bg-[#137A87] hover:bg-[#0f6370] text-white rounded-lg shadow-sm transition-all"
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Illustration (SVG placeholder) ────────────────────────────────────────
function EmptyIllustration() {
  return (
    <div className="flex justify-center mb-6">
      <div className="w-40 h-40 flex items-center justify-center">
        <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* desk */}
          <rect x="20" y="120" width="120" height="6" rx="3" fill="#e2e8f0" />
          {/* monitor */}
          <rect x="50" y="60" width="60" height="54" rx="4" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2"/>
          <rect x="56" y="66" width="48" height="36" rx="2" fill="#8ED1C9" opacity="0.3"/>
          <rect x="56" y="66" width="48" height="8" rx="2" fill="#4CC9B5" opacity="0.5"/>
          <rect x="60" y="78" width="30" height="3" rx="1.5" fill="#94a3b8"/>
          <rect x="60" y="84" width="22" height="3" rx="1.5" fill="#94a3b8"/>
          <rect x="60" y="90" width="28" height="3" rx="1.5" fill="#94a3b8"/>
          {/* stand */}
          <rect x="76" y="114" width="8" height="8" rx="1" fill="#cbd5e1"/>
          <rect x="66" y="120" width="28" height="4" rx="2" fill="#cbd5e1"/>
          {/* speech bubbles */}
          <rect x="90" y="30" width="40" height="26" rx="8" fill="#4CC9B5" opacity="0.8"/>
          <polygon points="100,56 110,56 104,64" fill="#4CC9B5" opacity="0.8"/>
          <rect x="95" y="37" width="12" height="3" rx="1.5" fill="white"/>
          <rect x="95" y="43" width="22" height="3" rx="1.5" fill="white"/>
          {/* person */}
          <circle cx="32" cy="72" r="12" fill="#fde68a"/>
          <rect x="22" y="84" width="20" height="28" rx="6" fill="#137A87" opacity="0.7"/>
          <line x1="22" y1="96" x2="10" y2="108" stroke="#fde68a" strokeWidth="4" strokeLinecap="round"/>
          <line x1="42" y1="96" x2="50" y2="100" stroke="#fde68a" strokeWidth="4" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export function ForumsPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  // Modal state
  const [showCatModal, setShowCatModal] = useState(false);
  const [showForumModal, setShowForumModal] = useState(false);
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [activeCatId, setActiveCatId] = useState<string | null>(null);
  const [activeForumId, setActiveForumId] = useState<string | null>(null);

  // Input state
  const [catName, setCatName] = useState("");
  const [forumName, setForumName] = useState("");
  const [forumDesc, setForumDesc] = useState("");
  const [topicTitle, setTopicTitle] = useState("");

  const hasCategories = categories.length > 0;
  const hasForums = categories.some((c) => c.forums.length > 0);
  const hasTopics = categories.some((c) => c.forums.some((f) => f.topics.length > 0));

  // Step progress: 1=cat done, 2=forum done, 3=topics done
  const step = hasTopics ? 3 : hasForums ? 2 : hasCategories ? 1 : 0;

  // ── Actions ──────────────────────────────────────────────────────────────
  const addCategory = () => {
    if (!catName.trim()) return;
    setCategories((prev) => [
      ...prev,
      { id: Date.now().toString(), name: catName.trim(), forums: [], expanded: true },
    ]);
    setCatName("");
    setShowCatModal(false);
  };

  const addForum = () => {
    if (!forumName.trim() || !activeCatId) return;
    setCategories((prev) =>
      prev.map((c) =>
        c.id === activeCatId
          ? {
              ...c,
              forums: [
                ...c.forums,
                {
                  id: Date.now().toString(),
                  name: forumName.trim(),
                  description: forumDesc.trim(),
                  topics: [],
                  expanded: false,
                },
              ],
            }
          : c
      )
    );
    setForumName("");
    setForumDesc("");
    setShowForumModal(false);
    setActiveCatId(null);
  };

  const addTopic = () => {
    if (!topicTitle.trim() || !activeCatId || !activeForumId) return;
    setCategories((prev) =>
      prev.map((c) =>
        c.id === activeCatId
          ? {
              ...c,
              forums: c.forums.map((f) =>
                f.id === activeForumId
                  ? {
                      ...f,
                      topics: [
                        ...f.topics,
                        {
                          id: Date.now().toString(),
                          title: topicTitle.trim(),
                          author: "Sarah Chen",
                          replies: 0,
                          createdAt: new Date().toLocaleString(),
                        },
                      ],
                    }
                  : f
              ),
            }
          : c
      )
    );
    setTopicTitle("");
    setShowTopicModal(false);
    setActiveCatId(null);
    setActiveForumId(null);
  };

  const toggleCat = (id: string) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, expanded: !c.expanded } : c))
    );
  };

  const toggleForum = (catId: string, forumId: string) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === catId
          ? {
              ...c,
              forums: c.forums.map((f) =>
                f.id === forumId ? { ...f, expanded: !f.expanded } : f
              ),
            }
          : c
      )
    );
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const deleteForum = (catId: string, forumId: string) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === catId
          ? { ...c, forums: c.forums.filter((f) => f.id !== forumId) }
          : c
      )
    );
  };

  const deleteTopic = (catId: string, forumId: string, topicId: string) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === catId
          ? {
              ...c,
              forums: c.forums.map((f) =>
                f.id === forumId
                  ? { ...f, topics: f.topics.filter((t) => t.id !== topicId) }
                  : f
              ),
            }
          : c
      )
    );
  };

  return (
    <div className="h-full overflow-y-auto bg-[#f7fafa]">
      {/* Modals */}
      {showCatModal && (
        <Modal
          title="Create Category"
          onClose={() => { setShowCatModal(false); setCatName(""); }}
          onSubmit={addCategory}
          submitLabel="Create Category"
        >
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Category Name <span className="text-red-400">*</span></label>
            <input
              autoFocus
              type="text"
              placeholder="e.g. General Discussion"
              value={catName}
              onChange={(e) => setCatName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addCategory()}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4CC9B5]/40 focus:border-[#4CC9B5] transition-all"
            />
          </div>
        </Modal>
      )}

      {showForumModal && (
        <Modal
          title="Create Forum"
          onClose={() => { setShowForumModal(false); setForumName(""); setForumDesc(""); }}
          onSubmit={addForum}
          submitLabel="Create Forum"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Forum Name <span className="text-red-400">*</span></label>
              <input
                autoFocus
                type="text"
                placeholder="e.g. Product Feedback"
                value={forumName}
                onChange={(e) => setForumName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addForum()}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4CC9B5]/40 focus:border-[#4CC9B5] transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Description</label>
              <textarea
                rows={2}
                placeholder="Briefly describe what this forum is about..."
                value={forumDesc}
                onChange={(e) => setForumDesc(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#4CC9B5]/40 focus:border-[#4CC9B5] transition-all"
              />
            </div>
          </div>
        </Modal>
      )}

      {showTopicModal && (
        <Modal
          title="Create Topic"
          onClose={() => { setShowTopicModal(false); setTopicTitle(""); }}
          onSubmit={addTopic}
          submitLabel="Create Topic"
        >
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Topic Title <span className="text-red-400">*</span></label>
            <input
              autoFocus
              type="text"
              placeholder="e.g. How do I reset my password?"
              value={topicTitle}
              onChange={(e) => setTopicTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTopic()}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4CC9B5]/40 focus:border-[#4CC9B5] transition-all"
            />
          </div>
        </Modal>
      )}

      {/* ── Top Bar ── */}
      <div className="px-6 py-3 bg-white border-b border-[#137A87]/10 flex items-center gap-2 text-sm">
        <List className="w-4 h-4 text-[#4CC9B5]" />
        <span className="text-[#137A87] font-medium">All Categories</span>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-semibold text-[#137A87]">Categories</h1>
          {hasCategories && (
            <button
              onClick={() => setShowCatModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#137A87] hover:bg-[#0f6370] text-white text-sm font-semibold shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" /> New Category
            </button>
          )}
        </div>

        {/* ── Empty state (no categories yet) ── */}
        {!hasCategories ? (
          <div className="bg-white rounded-2xl border border-[#8ED1C9]/30 shadow-sm p-10 flex flex-col items-center">
            <EmptyIllustration />
            <div className="space-y-5 w-full max-w-sm">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-[#137A87] text-white text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">1</div>
                <div>
                  <p className="text-sm font-semibold text-slate-700">Create your first category</p>
                  <p className="text-xs text-slate-400 mt-0.5 mb-3">Start by creating a category to organize your forums.</p>
                  <button
                    onClick={() => setShowCatModal(true)}
                    className="px-4 py-2 rounded-lg bg-[#137A87] hover:bg-[#0f6370] text-white text-sm font-semibold shadow-sm transition-all"
                  >
                    Create Category
                  </button>
                </div>
              </div>
              {/* Step 2 */}
              <div className="flex gap-4 opacity-40">
                <div className="w-6 h-6 rounded-full bg-slate-300 text-white text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">2</div>
                <div>
                  <p className="text-sm font-semibold text-slate-500">Create your first forum</p>
                  <p className="text-xs text-slate-400 mt-0.5">Add your first forum to your category.</p>
                </div>
              </div>
              {/* Step 3 */}
              <div className="flex gap-4 opacity-40">
                <div className="w-6 h-6 rounded-full bg-slate-300 text-white text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">3</div>
                <div>
                  <p className="text-sm font-semibold text-slate-500">Create your first topic</p>
                  <p className="text-xs text-slate-400 mt-0.5">Add your first topic to your forum.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ── Categories list ── */
          <div className="space-y-4">
            {categories.map((cat) => (
              <div key={cat.id} className="bg-white rounded-2xl border border-[#8ED1C9]/30 shadow-sm overflow-hidden">
                {/* Category header */}
                <div
                  className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-[#f7fafa] transition-colors group"
                  onClick={() => toggleCat(cat.id)}
                >
                  <div className="flex items-center gap-3">
                    {cat.expanded ? (
                      <ChevronDown className="w-4 h-4 text-[#4CC9B5]" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-[#4CC9B5]" />
                    )}
                    <Folder className="w-5 h-5 text-[#137A87]" />
                    <span className="font-semibold text-[#137A87]">{cat.name}</span>
                    <span className="text-xs text-slate-400 ml-1">({cat.forums.length} forum{cat.forums.length !== 1 ? "s" : ""})</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveCatId(cat.id);
                        setShowForumModal(true);
                      }}
                      className="flex items-center gap-1 text-xs text-[#4CC9B5] hover:text-[#137A87] font-medium transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Forum
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteCategory(cat.id);
                      }}
                      className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-100 transition-colors"
                      title="Delete Category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Forums */}
                {cat.expanded && (
                  <div className="border-t border-[#8ED1C9]/20">
                    {cat.forums.length === 0 ? (
                      <div className="px-8 py-6 text-center">
                        <BookOpen className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                        <p className="text-sm text-slate-400 mb-3">No forums yet in this category.</p>
                        <button
                          onClick={() => { setActiveCatId(cat.id); setShowForumModal(true); }}
                          className="px-4 py-2 rounded-lg bg-[#137A87] hover:bg-[#0f6370] text-white text-sm font-semibold shadow-sm transition-all"
                        >
                          Create Forum
                        </button>
                      </div>
                    ) : (
                      cat.forums.map((forum) => (
                        <div key={forum.id} className="border-b border-[#8ED1C9]/10 last:border-0">
                          {/* Forum row */}
                          <div
                            className="flex items-center justify-between px-8 py-3 cursor-pointer hover:bg-[#f7fafa] transition-colors group"
                            onClick={() => toggleForum(cat.id, forum.id)}
                          >
                            <div className="flex items-center gap-3">
                              {forum.expanded ? (
                                <ChevronDown className="w-3.5 h-3.5 text-[#8ED1C9]" />
                              ) : (
                                <ChevronRight className="w-3.5 h-3.5 text-[#8ED1C9]" />
                              )}
                              <Hash className="w-4 h-4 text-[#4CC9B5]" />
                              <div>
                                <p className="text-sm font-semibold text-slate-700">{forum.name}</p>
                                {forum.description && (
                                  <p className="text-xs text-slate-400">{forum.description}</p>
                                )}
                              </div>
                              <span className="ml-2 text-xs text-slate-400">({forum.topics.length} topic{forum.topics.length !== 1 ? "s" : ""})</span>
                            </div>
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveCatId(cat.id);
                                  setActiveForumId(forum.id);
                                  setShowTopicModal(true);
                                }}
                                className="flex items-center gap-1 text-xs text-[#4CC9B5] hover:text-[#137A87] font-medium transition-colors"
                              >
                                <Plus className="w-3 h-3" /> Add Topic
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteForum(cat.id, forum.id);
                                }}
                                className="p-1 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-100 transition-colors"
                                title="Delete Forum"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Topics */}
                          {forum.expanded && (
                            <div className="bg-[#f7fafa] border-t border-[#8ED1C9]/10">
                              {forum.topics.length === 0 ? (
                                <div className="px-12 py-4 text-center">
                                  <p className="text-xs text-slate-400 mb-2">No topics yet.</p>
                                  <button
                                    onClick={() => {
                                      setActiveCatId(cat.id);
                                      setActiveForumId(forum.id);
                                      setShowTopicModal(true);
                                    }}
                                    className="px-3 py-1.5 rounded-lg bg-[#137A87] hover:bg-[#0f6370] text-white text-xs font-semibold shadow-sm transition-all"
                                  >
                                    Create First Topic
                                  </button>
                                </div>
                              ) : (
                                <div>
                                  {/* Topic list header */}
                                  <div className="flex items-center justify-between px-12 py-2 border-b border-[#8ED1C9]/10">
                                    <span className="text-xs text-slate-400 uppercase tracking-wide font-medium">Topic</span>
                                    <div className="flex items-center gap-6 text-xs text-slate-400 uppercase tracking-wide font-medium">
                                      <span className="flex items-center gap-1"><Users className="w-3 h-3" /> Replies</span>
                                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Created</span>
                                    </div>
                                  </div>
                                  {forum.topics.map((topic) => (
                                    <div
                                      key={topic.id}
                                      className="flex items-center justify-between px-12 py-3 border-b border-[#8ED1C9]/10 last:border-0 hover:bg-white transition-colors cursor-pointer group"
                                    >
                                      <div className="flex items-center gap-2">
                                        <MessageSquare className="w-3.5 h-3.5 text-[#4CC9B5] flex-shrink-0" />
                                        <span className="text-sm text-[#137A87] font-medium group-hover:underline">{topic.title}</span>
                                        <span className="text-xs text-slate-400">· by {topic.author}</span>
                                      </div>
                                      <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-6 text-xs text-slate-500">
                                          <span>{topic.replies}</span>
                                          <span>{topic.createdAt}</span>
                                        </div>
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            deleteTopic(cat.id, forum.id, topic.id);
                                          }}
                                          className="p-1 text-slate-300 hover:text-red-500 rounded-md hover:bg-slate-100 transition-colors opacity-0 group-hover:opacity-100"
                                          title="Delete Topic"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                  <div className="px-12 py-2 flex justify-end border-t border-[#8ED1C9]/10">
                                    <button
                                      onClick={() => {
                                        setActiveCatId(cat.id);
                                        setActiveForumId(forum.id);
                                        setShowTopicModal(true);
                                      }}
                                      className="flex items-center gap-1 text-xs text-[#4CC9B5] hover:text-[#137A87] font-medium transition-colors"
                                    >
                                      <Plus className="w-3 h-3" /> New Topic
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))
                    )}

                    {/* Add Forum footer button */}
                    {cat.forums.length > 0 && (
                      <div className="px-8 py-2.5 flex justify-end border-t border-[#8ED1C9]/10">
                        <button
                          onClick={() => { setActiveCatId(cat.id); setShowForumModal(true); }}
                          className="flex items-center gap-1 text-xs text-[#4CC9B5] hover:text-[#137A87] font-medium transition-colors"
                        >
                          <Plus className="w-3 h-3" /> New Forum
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
