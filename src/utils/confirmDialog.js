export async function confirmAction({ title, text, confirmButtonText = "Yes", icon = "warning" }) {
  const { default: Swal } = await import("sweetalert2");
  const result = await Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText: "Cancel",
    confirmButtonColor: "#b8892f",
    cancelButtonColor: "#78716c",
    reverseButtons: true,
  });

  return result.isConfirmed;
}
