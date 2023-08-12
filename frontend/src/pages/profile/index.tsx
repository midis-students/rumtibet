import Page from '../../components/Page';
import { useLoaderData } from 'react-router-dom';

export default function Profile() {
  const user = useLoaderData() as any;

  console.log(user);

  return (
    <Page>
      <h1>
        {user.first_name} {user.last_name}
      </h1>
    </Page>
  );
}
