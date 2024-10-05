# DevOps with Kubernetes

## Exercise 3.06: DBaaS vs DIY

Database as a Service (DBaaS) such as the Google Cloud SQL is a fully managed database service. PersistentVolumeClaims are used in Kubernetes environments to manage storage for applications. In general fully managed services offer minimal setup, automatic backups, easy scaling and high availability with the trade-off of higher operating costs and less control. Managing storage through persistentVolumeClaims offers more control over the database and possiblity to save on operating costs. The tradeoff is (usually) higher initial costs and the need to manage scaling, backups and high availability manually.

### DbaaS

#### Pros:

- DBaaS service provider handles patching, upgrades, updates, security, scaling and maintenance
- Backups can be easily automated
- DBaaS services such Google Cloud SQL offer vertical and horizontal scaling and auto-scaling
- DBaaS services offer high availability through replication and automatic failover features
- DBaaS services provide security through service providers integrates IAM services
- DBaaS services are easy and quick to set up with minimal configuration
- DBaaS services integrate easily with other services offered by cloud service provider

#### Cons:

- Usually DbaaS services come with lower initial but higher operational costs
- DBaaS services offer less control over configuration (lower-level database configurations)

### DIY

#### Pros:

- DIY database services through PVCs offer flexibility and full control over the database (configuration, patches and tuning)
- Storage costs can be lower when paying only for the actual storage volume and container which runs the database
- Running DIY database with PVCs can offer good integration with Kubernetes since PVCs are native to Kubernetes
- Vendor lock can more easily be avoided with DIY database

#### Cons:

- Responsibility for managing backups, patching, security, updates, scaling and failover mechanisms for the service using the PVC.
- No built-in high availability
- More hands-on management and expertise in both Kubernetes and the database
- Requires additional tools for monitoring disk usage, health and performance
