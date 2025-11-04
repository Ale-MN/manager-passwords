import Link from "next/link";

export default function Logo() {
  return (
    <div>
      <Link href="/">
        <h1 className="text-xl font-bold">Administrar Pass</h1>
      </Link>
    </div>
  );
}
