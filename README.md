# Orquestração EC2

Contexto:

A empresa X possui máquinas EC2 onde suas aplicações estão hospedadas após sua migração inical para AWS. Foi identificado que as máquinas estavam sempre ociosas fora do período adimistrativo, que seria antes das 8 horas da manhã e após às 18 da tarde.
Foi levantada a possibilidade das máquinas serem desligadas todo dia após o expediente e ligadas novamente no dia seguinte para redução de custo.
Este projeto tem como objetivo exemplificar a execução deste cenário.

## Estrutura do projeto

Dois templates foram criados para provisionamento do ambiente, cloudformation e terraform, ambos estão localizados no diretório [infra](src/infra).

### Terraform

Para criação do ambiente via terraform um arquivo chamado **lambda.zip** precisa ser adicionado no diretório [terraform](src/infra/terraform), assim a lambda será criada junto com o ambiente.

A criação do ambiente pode ser feita com os comandos abaixo:

```
terraform init
terraform apply
```

Para destruir o ambiente criado o comando destroy deve ser utilizado:

```
terraform destroy
```

### Cloudformation

Uma dependência para a execução do template cloudformation é a criação de um bucket previamente. O lambda precisa de um local para ser armazenado e esta dependência não pode ser criada junto com o restante da infraestrutura (aparentemente é uma limitação do cloudformation). Portanto um bucket precisa ser criado e seu nome deverá ser adicionado no arquivo [parameters.json](src/infra/cloudformation/parameters.json).

```
aws cloudformation create-stack --stack-name ec2-stack --template-body file://template.yml --parameters file://parameters.json --capabilities CAPABILITY_IAM --on-failure DELETE
```

A stack pode ser removida com o comando delete-stack:

```
aws cloudformation delete-stack --stack-name ec2-stack
```

**Observação:** O arquivo parameters.json precisa ser alterado com valores reais, um template foi adicionado apenas para facilitar a utilização via CLI.

### Lambda

A lambda possui um trigger temporal (Event rule do EventBridge), um cron foi definido em ambos os templates com a expressão: "0 11/10 \* _ ? _", que é o equivalente a dizer que as execuções serão feitas 8 e 18 horas (O horário padrão da AWS é UTC).
Quando a execução é iniciada uma pesquisa pelas possíveis instâncias que atendem os requisitos para o desligamento é feita de acordo com suas tags, por padrão o filtro utiliza a tag `Shutdown` com o valor `true`, mas este filtro pode ser alterado dinamicamente com a variável de ambiente: TAG_FILTER.

#### Variaveis de ambiente

| Nome             | Descricao                                                      | Padrão    |
| ---------------- | -------------------------------------------------------------- | --------- |
| REGION           | Região em que a busca das instâncias irá executar (EC2 Client) | us-east-1 |
| TIME_TO_SHUTDOWN | Horário para considerar o desligamento das máquinas (UTC)      | 21        |
| SHUTDOWN         | Flag utilizada para ligar máquinas depois das 18               | true      |
| TAG_FILTER       | Alterar tag utilizada nofiltro das instâncias                  |           |
|                  |                                                                |           |
