import type { User } from "./AdminPage";

interface Props {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

function AdminUserTable({ users, onEdit, onDelete }: Props) {
  return (
    <table className="w-full border-collapse border">
      <thead>
        <tr className="bg-gray-100">
          <th className="border px-4 py-2">ID</th>
          <th className="border px-4 py-2">Name</th>
          <th className="border px-4 py-2">Email</th>
          <th className="border px-4 py-2">Role</th>
          <th className="border px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id} className="text-center">
            <td className="border px-4 py-2">{u.id}</td>
            <td className="border px-4 py-2">{u.name}</td>
            <td className="border px-4 py-2">{u.email}</td>
            <td className="border px-4 py-2">{u.role}</td>
            <td className="border px-4 py-2 space-x-2">
              <button
                onClick={() => onEdit(u)}
                className="px-2 py-1 bg-blue-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(u.id)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AdminUserTable;
