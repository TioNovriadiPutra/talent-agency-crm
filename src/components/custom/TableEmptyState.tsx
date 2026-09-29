import { DocumentText } from "iconsax-reactjs";

type Props = {
  colSpan: number;
};

function TableEmptyState({ colSpan }: Props) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-4 py-12 text-center">
        <div
          aria-hidden="true"
          className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-400"
        >
          <DocumentText size={28} variant="Bulk" color="currentColor" />
        </div>
        <p className="text-body-s font-medium text-neutral-900">
          Belum ada data
        </p>
        <p className="mt-2 text-body-xs text-neutral-500">
          Data akan muncul di sini setelah tersedia.
        </p>
      </td>
    </tr>
  );
}

export default TableEmptyState;
