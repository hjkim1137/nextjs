'use client';
import { useRouter } from 'next/navigation';

export default function Create() {
  const router = useRouter();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const title = e.target.title.value; // target은 form 태그
        const body = e.target.body.value; // name이 body인 태그의 value를 가져옴
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, body }), // js -> JSON
        };
        fetch(`http://localhost:9999/topics`, options)
          .then((res) => res.json())
          .then((result) => {
            console.log('result', result);
            const lastid = result.id;
            router.refresh();
            router.push(`/read/${lastid}`);
          });
      }}
    >
      <p>
        <input type="text" name="title" placeholder="title" />
      </p>
      <p>
        <textarea name="body" placeholder="body"></textarea>
      </p>
      <p>
        <input type="submit" value="create" />
      </p>
    </form>
  );
}
