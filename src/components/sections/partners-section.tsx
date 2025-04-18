
export const PartnersSection = () => {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-4">Our Valued Partners</h2>
      <p className="text-muted-foreground mb-6">
        We are honored to collaborate with our trusted partners who share our passion for sports and community. 
        Their support enables us to create unforgettable experiences that bring athletes, fans, and enthusiasts together.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Placeholder for partner logos */}
        {[1, 2, 3, 4].map((partner) => (
          <div key={partner} className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <span className="text-muted-foreground">Partner Logo</span>
          </div>
        ))}
      </div>
    </section>
  );
};
