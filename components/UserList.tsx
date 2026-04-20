'use client';

interface UserListProps {
  users: string[];
  currentUser: string;
}

export default function UserList({ users, currentUser }: UserListProps) {
  return (
    <aside className="w-50 border-r border-[#c41e1e] p-4 h-full">
      {/* Header section */}
      <p className="text-[11px] font-semibold uppercase text-[#888] mb-4">
        Online — {users.length}
      </p>

      {/* User list */}
      <div className="space-y-1.5">
        {users.map((user) => (
          <div key={user} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1D9E75] shrink-0" />
            
            <span className={`text-[14px] truncate ${user === currentUser ? "font-semibold" : "font-normal"}`}>
              {user}{user === currentUser ? ' (you)' : ''}
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
}