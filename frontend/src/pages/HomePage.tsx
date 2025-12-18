import ImageUploadInput from "../components/ImageUploadInput";

const HomePage = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Welcome to the skin cancer detect page</h1>
      <p>Let's see your skin cancer</p>
      <ImageUploadInput />
    </div>
  );
};

export default HomePage;
